import { db, contactsTable } from "../lib/db/src/index";

async function main() {
  try {
    const result = await db.insert(contactsTable).values({
      name: "Test User",
      email: "test@example.com",
      phone: "1234567890",
      service: "General Inquiry",
      message: "This is a test message to verify the 'send message' functionality.",
      language: "en",
    });

    console.log("Insert successful! Result:", result);

    const check = await db.select().from(contactsTable);
    console.log("Current messages in DB:", check.length);
    console.log("Latest message:", check[check.length - 1]);
    
    process.exit(0);
  } catch (error) {
    console.error("Error inserting message:", error);
    process.exit(1);
  }
}

main();
