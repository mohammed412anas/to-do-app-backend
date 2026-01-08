import { addItem, deleteItem, editItem, getItems } from "./service";
import { ResponseType } from "./servicesTypes";
import db from "./../config/index";

const mockedTask = {
  id: "Mocked Id",
  name: "Mocked Task",
  description: "Mocked Description",
  status: "Mocked Status",
  priority: "Mocked Priority",
  deadline: new Date(),
};
let exists = true;
const mockedSet = jest.fn();
const mockedUpdate = jest.fn();
const mockedDelete = jest.fn();
const mockedDoc = jest.fn(() => ({
  set: mockedSet,
  update: mockedUpdate,
  get: mockedGet,
  delete: mockedDelete,
}));
const mockedGet = jest.fn(() => ({
  docs: [
    {
      data: jest.fn(() => [mockedTask]),
      id: "Mocked Id",
    },
  ],
  exists: exists,
}));
const mockedCollection = {
  get: mockedGet,
  doc: mockedDoc,
};

jest.mock("../config", () => ({
  collection: jest.fn(() => mockedCollection),
}));

describe(`Test services that which deals with firestore database`, () => {
  beforeEach(() => jest.clearAllMocks());
  test("should mock the addItem and return mocked response", async () => {
    const addTask = (await addItem(mockedTask)) as ResponseType;
    expect(addTask.statusCode).toBe(201);
    expect(addTask.message).toBe("New task added successfully");
  });
  test("should mock the getItem and return mocked response", async () => {
    const getTasks = (await getItems()) as ResponseType;
    expect(getTasks.statusCode).toBe(200);
    expect(getTasks.message).toBe("Tasks fetched Successfully");
  });
  test("should mock editItem, edit a task in mocked db and return mocked response", async () => {
    const editTask = (await editItem(mockedTask)) as ResponseType;
    expect(editTask.statusCode).toBe(201);
    expect(editTask.message).toBe("Task editted successfully");
  });
  test("should mock the editItem but not edit add task with invalid id return mocked response", async () => {
    mockedTask.id = "Invalid Id";
    const editTask = (await editItem(mockedTask)) as ResponseType;
    expect(editTask.statusCode).toBe(404);
    expect(editTask.message).toBe("Task not found");
  });
  test("should mock the deleteItem if the task is exist and return success response", async () => {
    const deleteTask = (await deleteItem(mockedTask.id)) as ResponseType;
    expect(deleteTask.statusCode).toBe(204);
    expect(deleteTask.message).toBe("Task has deleted successfully");
  });
  test("should mock the deleteItem but do not delete if task don't exist on database and return ", async () => {
    exists = false;
    const deleteTask = (await deleteItem(mockedTask.id)) as ResponseType;
    expect(deleteTask.statusCode).toBe(404);
    expect(deleteTask.message).toEqual(
      `No Task found with the Id : ${mockedTask.id}, Please provide the valid data`
    );
  });
  test("should add item throw error with message 'Error from database'", async () => {
    jest.spyOn(db, "collection").mockImplementation(() => {
      throw "Error from database";
    });
    const addTask = (await addItem(mockedTask)) as Error;
    expect(addTask.message).toEqual("Error from database");
  });
  test("should get items throw error with message 'Error from database'", async () => {
    jest.spyOn(db, "collection").mockImplementation(() => {
      throw "Error from database";
    });
    const addTask = (await getItems()) as Error;
    expect(addTask.message).toEqual("Error from database");
  });
  test("should edit item throw error with message 'Error from database'", async () => {
    jest.spyOn(db, "collection").mockImplementation(() => {
      throw "Error from database";
    });
    const addTask = (await editItem(mockedTask)) as Error;
    expect(addTask.message).toEqual("Error from database");
  });
  test("should delete item throw error with message 'Error from database'", async () => {
    jest.spyOn(db, "collection").mockImplementation(() => {
      throw "Error from database";
    });
    const addTask = (await deleteItem(mockedTask.id)) as Error;
    expect(addTask.message).toEqual("Error from database");
  });
});
