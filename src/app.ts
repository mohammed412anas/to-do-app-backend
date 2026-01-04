import express, { Express } from "express";
import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
import router from "./routes/router";

dotenv.config();

const app: Express = express();
const corsOptions: CorsOptions = {
  origin: true,
  methods: ["GET", "PUT", "POST", "DELETE"],
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(router);

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
