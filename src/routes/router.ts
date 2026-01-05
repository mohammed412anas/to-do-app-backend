import express,{ IRouter } from "express";
import { addTask, deleteTask, editTask, getTasks } from "../controllers/controller";

const router:IRouter = express.Router();

router.post(`/addTask`,addTask);
router.get(`/getTasks`, getTasks);
router.put(`/editTask`, editTask);
router.delete(`/deleteTask/:taskId`, deleteTask);
export default router;