import express,{ IRouter } from "express";
import { addTask, editTask, getTasks } from "../controllers/controller";

const router:IRouter = express.Router();

router.post(`/addTask`,addTask);
router.get(`/getTasks`, getTasks);
router.put(`/editTask`, editTask);

export default router;