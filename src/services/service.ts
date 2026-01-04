import db from "../config";
import addItemType, { getItemType, ResponseType, task } from "./servicesTypes";

const response: ResponseType = {
  statusCode: 404,
  message: "Uncaught error",
  tasks: [],
};

export const addItem: addItemType = async (task) => {
  try {
    const collection = await db.collection("user");
    await collection.doc(task.id).set(task);

    response.statusCode = 201;
    response.message = "New task added successfully";
    response.tasks = (await collection.get()).docs.map((doc) =>
      doc.data()
    ) as task[];

    return response;
  } catch (error) {
    return new Error(error as string);
  }
};

export const getItems: getItemType = async () => {
  try {
    response.statusCode = 200;
    response.message = "Tasks fetched Successfully";
    response.tasks = (await db.collection('user').get()).docs.map((doc) =>
      doc.data()
    ) as task[];

    return response;
  } catch (error) {
    return new Error(error as string);
  }
};
