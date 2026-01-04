import { addItem } from "./service";

const mockedTask = {
  id: String(new Date().valueOf()),
  name: "Mocked Task",
  description: "Mocked Description",
  status: "Mocked Status",
  priority: "Mocked Priority",
  deadline: new Date(),
};

const mockedResponse = {
  statusCode: 201,
  message: "New task added successfully",
  tasks: [mockedTask],
};

const mockedSet = jest.fn();
const mockedDoc = jest.fn(() => ({ set: mockedSet }));
const mockedGet = jest.fn(() => ({
  docs: [
    {
      data: jest.fn(() => [mockedTask]),
    },
  ],
}));
const mockedCollection = {
  get: mockedGet,
  doc: mockedDoc
};

jest.mock("../config", () => ({
    collection: jest.fn(()=>mockedCollection)
}));

describe(`Test services that which deals with firestore database`, () => {
  test("should mock the addItem and return mocked response", async () => {
    const addTask = await addItem(mockedTask);
    expect(addTask.statusCode).toBe(201);
    expect(addTask.message).toBe("New task added successfully");
  });
});
