import { addItem, editItem, getItems } from "./service";
import { ResponseType } from "./servicesTypes";

const mockedTask = {
  id: 'Mocked Id',
  name: "Mocked Task",
  description: "Mocked Description",
  status: "Mocked Status",
  priority: "Mocked Priority",
  deadline: new Date(),
};

const mockedSet = jest.fn();
const mockedUpdate = jest.fn();
const mockedDoc = jest.fn(() => ({ set: mockedSet, update: mockedUpdate }));
const mockedGet = jest.fn(() => ({
  docs: [
    {
      data: jest.fn(() => [mockedTask]),
      id: "Mocked Id",
    },
  ],
}));
const mockedCollection = {
  get: mockedGet,
  doc: mockedDoc,
};

jest.mock("../config", () => ({
  collection: jest.fn(() => mockedCollection),
}));

describe(`Test services that which deals with firestore database`, () => {
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
    mockedTask.id = 'Invalid Id'
    const editTask = (await editItem(mockedTask)) as ResponseType;
    expect(editTask.statusCode).toBe(404);
    expect(editTask.message).toBe("Task not found");
  });
});
