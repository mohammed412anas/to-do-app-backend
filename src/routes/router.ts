import express,{ IRouter } from "express";
import { addTask } from "../controllers/controller";

const router:IRouter = express.Router();

router.post(`/addTask`,addTask)

export default router;