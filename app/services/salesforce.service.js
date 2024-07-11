import jsforce from "jsforce";
import { config } from "dotenv";

config();

const oauth2 = new jsforce.OAuth2({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: "http://localhost:3000/api/v1/oauth/callback ",
  // you can change loginUrl to connect to your sandbox.
  loginUrl: process.env.INSTANCE_URL,
  refreshToken: process.env.REFRESH_TOKEN,
});

const connection = new jsforce.Connection({
  oauth2,
  instanceUrl: process.env.INSTANCE_URL,
  version: "59.0",
  refreshToken: process.env.REFRESH_TOKEN,
});

class Salesforce {
  getProducts() {
    return connection.query(
      `SELECT 
        Id, Name, Family, Description, 
        (SELECT Id, UnitPrice FROM PricebookEntries WHERE Pricebook2.isStandard = true),
        (
          SELECT Id, ContentDocument.Id, ContentDocument.LatestPublishedVersionId, ContentDocument.LatestPublishedVersion.VersionData, ContentDocument.FileExtension, ContentDocument.LatestPublishedVersion.PathOnClient 
          FROM ContentDocumentLinks ORDER BY ContentDocument.LastModifiedDate DESC
        )
      FROM Product2 WHERE isActive = true`
    );
  }

  createPatient(record) {
    return connection.sobject("Contact").create(record);
  }

  upsertPatient(record) {
    return connection.sobject("Contact").upsert(record, "HealthFare_UUID__c", {
      headers: {
        "Sforce-Duplicate-Rule-Header": "allowSave=true",
      },
    });
  }

  getContentVersion(id) {
    return connection.sobject("ContentVersion").record(id).blob("VersionData");
  }

  getConnection() {
    return connection;
  }
}

export default new Salesforce();
