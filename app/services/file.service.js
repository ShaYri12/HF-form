import fs, { createWriteStream } from "fs";

class FileService {
  static streamFile(path, options) {
    const downloadStream = fs.createReadStream(path, options);

    return new ReadableStream({
      start(controller) {
        downloadStream.on("data", (chunk) =>
          controller.enqueue(new Uint8Array(chunk))
        );
        downloadStream.on("end", () => controller.close());
        downloadStream.on("error", (error) => controller.error(error));
      },
      cancel() {
        downloadStream.destroy();
      },
    });
  }

  static downloadFile(fileRes, fileOut) {
    return new Promise((resolve, reject) => {
      fileRes
        .pipe(
          createWriteStream(
            typeof fileOut === "object" ? fileOut.name : fileOut
          )
        )
        .on("finish", () => {
          resolve();
        })
        .on("error", (error) => {
          console.error("Error downloading file", error);
          reject(error);
        });
    });
  }
}

export default FileService;
