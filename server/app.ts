import express, { Express } from "express";
const app: Express = express();
const port = 3000;

app.use(express.static("dist"));

import cors from "cors";

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.get("/", (_, res) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
