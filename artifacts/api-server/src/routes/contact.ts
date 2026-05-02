import { Router, type IRouter } from "express";
import { db, contactsTable } from "@workspace/db";
import { SubmitContactBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/contact", async (req, res) => {
  const parsed = SubmitContactBody.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input: " + parsed.error.message });
    return;
  }

  try {
    const result = await db.insert(contactsTable).values({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone ?? null,
      service: parsed.data.service,
      message: parsed.data.message,
      language: parsed.data.language ?? "en",
    });

    res.status(201).json({
      success: true,
      message:
        "Thank you! We will contact you shortly. / ¡Gracias! Nos pondremos en contacto pronto.",
      id: 0,
    });
  } catch (err) {
    console.error("Error inserting contact:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
