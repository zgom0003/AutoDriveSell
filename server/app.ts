import express, { Express } from "express";
import catalogRouter from "./routes/catalog";
import cors from "cors";

const app: Express = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

app.use(catalogRouter);
app.use(express.static("dist"));

app.get("/", (_, res) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
