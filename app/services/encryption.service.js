import crypto from "crypto";
const defaultSecretKey = "ax2d3f4g5h6j7k8l9z0x1c2v3b4n5m6";

class EncryptionService {
  constructor(secretKey = defaultSecretKey) {
    this.secretKey = secretKey.padEnd(32, " ").slice(0, 32); // Ensure the key is 32 bytes
    this.algorithm = "aes-256-cbc";
  }

  encrypt(text) {
    const iv = crypto.randomBytes(16); // Generate a random IV
    const cipher = crypto.createCipheriv(
      this.algorithm,
      Buffer.from(this.secretKey),
      iv
    );
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return `${iv.toString("hex")}:${encrypted.toString("hex")}`; // Return IV and encrypted data as hex
  }

  decrypt(text) {
    const textParts = text.split(":"); // Split IV and encrypted text
    const iv = Buffer.from(textParts.shift(), "hex");
    const encryptedText = Buffer.from(textParts.join(":"), "hex");
    const decipher = crypto.createDecipheriv(
      this.algorithm,
      Buffer.from(this.secretKey),
      iv
    );
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }
}

export default new EncryptionService();
