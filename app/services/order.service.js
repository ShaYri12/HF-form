import salesforceService from "./salesforce.service.js";
import encryptionService from "./encryption.service.js";
import { v4 as uuidv4 } from "uuid";

class OrderError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
    this.name = "ORDER_ERROR";
  }
}

class OrderService {
  constructor() {
    this.connection = salesforceService.getConnection();
  }

  async createOrder(rawOrder) {
    let products = [];
    const order = await this.transform(rawOrder);
    if (rawOrder.order.Id) {
      order.Id = rawOrder.order.Id;
    }

    // create order
    const createdOrder = await this.connection
      .sobject("Order")
      .upsert(order, order.Id ? "Id" : "HealthFare_UUID__c");

    // if order.Id was present delete all order items
    if (order.Id) {
      // get all order items
      const orderItems = await this.connection.query(
        `SELECT Id FROM OrderItem WHERE OrderId = '${order.Id}'`
      );
      // delete all order items
      if (orderItems.records.length > 0) {
        const deletedOrderItems = await this.connection
          .sobject("OrderItem")
          .del(orderItems.records.map((item) => item.Id));
        console.log("Order items deleted", deletedOrderItems);
      }
    }

    console.log("Order created", createdOrder);

    if (createdOrder.id) {
      products = await this.transformProducts(createdOrder.id, rawOrder);
      // create order items
      const createdProducts = await this.connection
        .sobject("OrderItem")
        .create(products);
      console.log("Order items created", createdProducts);
      // check if all products are created
      if (createdProducts.length === products.length) {
        console.log("Order created", createdOrder);
      } else {
        throw new OrderError("Order items not created", "ORDER_ITEMS_ERROR");
      }
    } else {
      throw new OrderError("Order not created", "ORDER_ERROR");
    }
    // query the order and return
    const result = await this.connection.query(
      `SELECT 
        Id, OrderNumber, Status, TotalAmount, BillToContact.Name, BillToContact.Phone, BillToContact.Email, BillToContact.Id, Type,
        (SELECT Id, PricebookEntry.Product2.Stripe_Id__c, PricebookEntry.Stripe_Price_Id__c, PricebookEntry.Product2.Product_Type__c FROM OrderItems) 
        FROM Order WHERE Id = '${createdOrder.id}'`
    );

    // encrypt the order id
    //result.records[0].Id = encryptionService.encrypt(result.records[0].Id);
    delete result.records[0].attributes;

    // clean up orderItems
    result.records[0].Products = result.records[0].OrderItems.records.map(
      (item) => {
        return {
          stripe_product_id: item.PricebookEntry.Product2.Stripe_Id__c,
          stripe_price_id: item.PricebookEntry.Stripe_Price_Id__c,
          product_type: item.PricebookEntry.Product2.Product_Type__c,
        };
      }
    );

    delete result.records[0].OrderItems;

    // clean up contact
    result.records[0].Customer = {
      Name: result.records[0].BillToContact.Name,
      Phone: result.records[0].BillToContact.Phone,
      Email: result.records[0].BillToContact.Email,
      Id: result.records[0].BillToContact.Id,
    };

    delete result.records[0].BillToContact;

    return result.records[0];
  }

  async transform(rawOrder) {
    const birthDate = `${rawOrder.stepSix.year}-${rawOrder.stepSix.month}-${rawOrder.stepSix.day}`;
    const healthFareUUID = [
      rawOrder.stepSix.email,
      rawOrder.stepSix.phone,
      birthDate,
    ].join("||");

    const shippingAddress = this.getShippingAddress(rawOrder.stepSix);

    let order = {
      AccountId: "001RL00000DwRmjYAF",
      Pricebook2Id: "01s3h000004nzyaAAA",
      HealthFare_UUID__c: uuidv4(),
      Status: "Draft",
      Type:
        rawOrder.planSelection.planCode == "1M" ? "Subscription" : "One Time",
      EffectiveDate: new Date().toISOString().split("T")[0],
      CustomerAuthorizedBy: {
        HealthFare_UUID__c: healthFareUUID,
      },
      BillToContact: {
        HealthFare_UUID__c: healthFareUUID,
      },
      ...shippingAddress,
    };
    return order;
  }

  async transformProducts(orderId, rawOrder) {
    // get the main product from stepTwo
    let productCodes = [];
    if (rawOrder.stepTwo) {
      let productCode = rawOrder.stepTwo.code;
      if (rawOrder.planSelection && rawOrder.planSelection.planCode) {
        productCode = productCode + "-" + rawOrder.planSelection.planCode;
      }
      productCodes.push(productCode);
    }

    // get the supplement products from stepThree
    if (rawOrder.stepThree) {
      for (let product of rawOrder.stepThree.cart || []) {
        productCodes.push(product.code);
      }
    }

    // get addons from stepTen
    if (rawOrder.stepTen) {
      for (let product of rawOrder.stepTen.addoncart || []) {
        productCodes.push(product.code);
      }
    }

    console.log("productCodes", productCodes);

    // find pricebook entries for the products from standard pricebook
    // create a map of product code to pricebook entry

    const result = await this.connection.query(
      `SELECT Id, Product2Id, UnitPrice, Pricebook2Id,  Product2.ProductCode FROM PricebookEntry WHERE Product2.ProductCode IN ('${productCodes.join(
        "','"
      )}') AND Pricebook2.isStandard = true`
    );

    console.log("Pricebook entries", result.records);

    let productMap = {};
    (result.records || []).forEach((record) => {
      productMap[record.Product2.ProductCode] = record;
    });

    const products = [];
    // create order items for each product
    if (rawOrder.stepTwo) {
      const code =
        rawOrder.stepTwo.code + "-" + rawOrder.planSelection.planCode;
      products.push({
        PriceBookEntryId: productMap[code].Id,
        Quantity: rawOrder.stepTwo.quantity,
        OrderId: orderId,
        UnitPrice: productMap[code].UnitPrice,
      });
    }

    if (rawOrder.stepThree) {
      (rawOrder.stepThree.cart || []).forEach((product) => {
        products.push({
          Product2Id: productMap[product.code].Id,
          Quantity: product.quantity,
          OrderId: orderId,
          UnitPrice: productMap[product.code].UnitPrice,
        });
      });
    }

    if (rawOrder.stepTen) {
      (rawOrder.stepTen.addoncart || []).forEach((product) => {
        products.push({
          Product2Id: productMap[product.code].Id,
          Quantity: product.quantity,
          OrderId: orderId,
          UnitPrice: productMap[product.code].UnitPrice,
        });
      });
    }

    return products;
  }

  getShippingAddress(record) {
    const streetAddresses = [record.streetAddress1, record.streetAddress2]
      .filter((s) => s)
      .join(", ");

    return {
      ShippingStreet: streetAddresses,
      ShippingCity: record.city,
      ShippingState: record.state,
      ShippingPostalCode: record.zipCode,
      ShippingCountry: "United States",
    };
  }
}

export default new OrderService();
