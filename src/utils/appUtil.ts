import { createHmac, randomBytes } from "crypto";

export const genRandomString = async function (length) {
  return randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
};

export const encryptHashPassword = async function (password: string, salt: string) {
  const hash = createHmac("sha512", salt);
  hash.update(password);
  return hash.digest("hex");
};