import express, { type Express } from "express";
import cors from "cors";
import path from "path";
import router from "./routes";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

const staticPath = path.resolve(__dirname, "../../coldspace-solutions/dist/public");
app.use(express.static(staticPath));

// Fallback for client-side routing
app.get("*", (req, res) => {
  res.sendFile(path.resolve(staticPath, "index.html"));
});

export default app;
