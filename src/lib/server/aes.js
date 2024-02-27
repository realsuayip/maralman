// MPL-2.0
// https://gist.github.com/AndiDittrich/4629e7db04819244e843

import crypto from "crypto";

// todo: make this env variable.
const SECRET_KEY = "2vc63XwDv1YlqRuRyaWHcBSrprZOkEXR";
const ITERATIONS = 8150;

function encrypt(text) {
  const iv = crypto.randomBytes(16);
  const salt = crypto.randomBytes(64);
  const key = crypto.pbkdf2Sync(SECRET_KEY, salt, ITERATIONS, 32, "sha512");
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([
    cipher.update(text, "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([salt, iv, tag, encrypted]).toString("base64url");
}

function decrypt(data) {
  const buf = Buffer.from(data, "base64url");
  const salt = buf.subarray(0, 64);
  const iv = buf.subarray(64, 80);
  const tag = buf.subarray(80, 96);
  const text = buf.subarray(96);
  const key = crypto.pbkdf2Sync(SECRET_KEY, salt, ITERATIONS, 32, "sha512");
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(tag);
  return decipher.update(text, "binary", "utf8") + decipher.final("utf8");
}

export default { encrypt, decrypt };
