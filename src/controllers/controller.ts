import { Request, Response } from "express";
import { addItem, getItems } from "../services/service";
import { ResponseType } from "../services/servicesTypes";

export const addTask = async (req: Request, res: Response) => {
  try {
    const { task } = req.body;
    const response = await addItem(task) as ResponseType;
    res.status(response.statusCode).contentType("json").json(response);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const response = (await getItems()) as ResponseType;
    res.status(response.statusCode).contentType("json").json(response);
  } catch (error) {
    res.status(500).send(error);
  }
};
