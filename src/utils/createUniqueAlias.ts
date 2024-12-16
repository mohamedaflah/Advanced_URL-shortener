import crypto from "crypto";
function generateAliasHelper(url: string) {
  const baseAlias = url
    .replace(/https?:\/\//, "") // Remove protocol
    .replace(/www\./, "") // Remove 'www'
    .split("/")[0] // Take the domain
    .replace(/[^\w]/g, "-") // Replace non-alphanumeric characters with '-'
    .toLowerCase();

  const randomPart = crypto.randomBytes(2).toString("hex"); // Generate a 4-character hex string
  return `${baseAlias}-${randomPart}`;
}

export function createUniqueAlias(url: string): string {
  let alias: string;
  //   do {
  alias = generateAliasHelper(url);
  //   } while (database[alias]);  

  return alias;
}
