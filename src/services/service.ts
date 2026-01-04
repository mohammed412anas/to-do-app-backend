import db from "../config";
import addItemType, { ResponseType, task } from "./servicesTypes";

const response: ResponseType = {
  statusCode: 404,
  message: "Uncaught error",
  tasks: [],
};

export const addItem: addItemType = async (task) => {
  const collection = await db.collection("user");
  await collection.doc(task.id).set(task);

  response.statusCode = 201;
  response.message = "New task added successfully";
  response.tasks = (await collection.get()).docs.map((doc) =>
    doc.data()
  ) as task[];

  return response;
};
