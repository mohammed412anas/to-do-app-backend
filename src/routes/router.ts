import express,{ IRouter } from "express";
import { addTask, getTasks } from "../controllers/controller";

const router:IRouter = express.Router();

router.post(`/addTask`,addTask);
router.get(`/gettasks`, getTasks);

export default router;