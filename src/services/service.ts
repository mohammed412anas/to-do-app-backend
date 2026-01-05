import db from "../config";
import addItemType, {
  deleteItemType,
  editItemType,
  getItemType,
  ResponseType,
  task,
} from "./servicesTypes";

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
    response.tasks = (await db.collection("user").get()).docs.map((doc) =>
      doc.data()
    ) as task[];

    return response;
  } catch (error) {
    return new Error(error as string);
  }
};

export const editItem: editItemType = async (task) => {
  try {
    const collection = await db.collection("user").get();
    const getTaskIds = collection.docs.map((doc) => doc.id);

    response.statusCode = 404;
    response.message = "Task not found";
    response.tasks = [];

    if (getTaskIds.findIndex((id) => id === task.id) !== -1) {
      await db.collection("user").doc(task.id).set(task);
      response.statusCode = 201;
      response.message = "Task editted successfully";
      response.tasks = collection.docs.map((doc) => doc.data()) as task[];
    }

    return response;
  } catch (error) {
    return new Error(error as string);
  }
};

export const deleteItem: deleteItemType = async (taskId) => {
  try {
    const taskExist = await (
      await db.collection("user").doc(taskId).get()
    ).exists;

    if (taskExist) {
      await db.collection("user").doc(taskId).delete();
      response.message = `Task has deleted successfully`;
      response.statusCode = 204;
      response.tasks = await (await db.collection('user').get()).docs.map((doc) => doc.data()) as task[];
    } else {
      response.statusCode = 404;
      response.message = `No Task found with the Id : ${taskId}, Please provide the valid data`;
      response.tasks = [];
    }
    return response;
  } catch (error) {
    return new Error(error as string);
  }
};
