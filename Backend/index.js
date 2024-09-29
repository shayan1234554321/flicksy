import dotenv from "dotenv";
dotenv.config();

import "./library/mongoDB.js";
import express from "express";
import cors from "cors";
import path from "path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import routes from "./routes/index.js";

// Initializations
const app = express();
const port = process.env.PORT || 4500;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "/assets")));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use("/api", routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
