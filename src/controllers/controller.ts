import { Request, Response } from "express";
import { addItem } from "../services/service";

export const addTask = async (req: Request, res: Response) => {
  try {
    const { task } = req.body;
    const response = await addItem(task);
    res.status(response.statusCode).contentType("json").json(response);
  } catch (error) {
    res.status(500).send(error);
  }
};

