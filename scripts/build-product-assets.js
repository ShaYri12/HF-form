import salesforceService from "../app/services/salesforce.service.js";
import path from "path";
import FileService from "../app/services/file.service.js";
import fs from "fs-extra";

const ASSET_CACHE_DIR = path.resolve("./public/assets/products");

async function download(cd) {
  console.log("Downloading", cd.filePath);
  const fileOut = cd.filePath;
  const fileRes = salesforceService.getContentVersion(
    cd.LatestPublishedVersionId
  );
  await FileService.downloadFile(fileRes, fileOut);
}

async function getProducts() {
  return salesforceService.getConnection().query(
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

async function buildProductAssetCache() {
  await fs.emptyDir(ASSET_CACHE_DIR);
  const products = (await getProducts()).records || [];
  const documents = [];
  for (const product of products) {
    const links = product.ContentDocumentLinks?.records || [];
    for (const link of links) {
      link.ContentDocument.filePath = path.join(
        ASSET_CACHE_DIR,
        link.ContentDocument.Id,
        link.ContentDocument.LatestPublishedVersion.PathOnClient
      );
      await fs.ensureFile(link.ContentDocument.filePath);
      documents.push(link.ContentDocument);
    }
  }

  console.log(`Downloading ${documents.length} documents`);
  // chunkify the documents
  const chunkSize = 5;
  const chunks = [];
  for (let i = 0; i < documents.length; i += chunkSize) {
    chunks.push(documents.slice(i, i + chunkSize));
  }

  for (const chunk of chunks) {
    await Promise.all(chunk.map(download));
  }
  console.log("Completed building product asset cache");
}

buildProductAssetCache();
