import { db, siteContentTable } from "@workspace/db";
import { count } from "drizzle-orm";

async function main() {
  try {
    const result = await db.select({ value: count() }).from(siteContentTable);
    console.log("Connection successful! Count of site config items:", result[0].value);
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
}

main();
