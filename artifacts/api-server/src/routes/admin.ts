import { Router, type IRouter } from "express";
import { db, contactsTable, siteContentTable } from "@workspace/db";
import { desc, eq } from "drizzle-orm";

const router: IRouter = Router();

router.get("/contact", async (req, res) => {
  try {
    const contacts = await db
      .select()
      .from(contactsTable)
      .orderBy(desc(contactsTable.createdAt));

    res.json(contacts);
  } catch (err) {
    console.error("Error fetching contacts:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/content", async (req, res) => {
  try {
    const contentList = await db.select().from(siteContentTable);
    res.json(contentList);
  } catch (err) {
    console.error("Error fetching content:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/content/:key", async (req, res) => {
  try {
    const { key } = req.params;
    const { value } = req.body;

    const existing = await db
      .select()
      .from(siteContentTable)
      .where(eq(siteContentTable.key, key))
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(siteContentTable)
        .set({ value: value ?? null })
        .where(eq(siteContentTable.key, key));
    } else {
      await db.insert(siteContentTable).values({
        key,
        value: value ?? null,
      });
    }

    res.json({ key, value });
  } catch (err) {
    console.error("Error updating content:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
