import express, { Express } from "express";

import dotenv from "dotenv";
import router from "./routes/router";

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(router);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

export default app;
