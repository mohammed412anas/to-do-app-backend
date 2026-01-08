import request from "supertest";
import app from "../app";
import * as services from "../services/service";

let mockedTask = {
  id: "Mocked Id",
  name: "Mocked Task",
  description: "Mocked Description",
  status: "Mocked Status",
  priority: "Mocked Priority",
  deadline: String(new Date("1970-01-01T00:00:00.100Z")),
};
let mockedResponse = {
  statusCode: 200,
  message: "Tasks fetched Successfully",
  tasks: [mockedTask],
};
jest.mock("../services/service", () => ({
  getItems: jest.fn(() => mockedResponse),
  addItem: jest.fn(() => mockedResponse),
  editItem: jest.fn(() => mockedResponse),
  deleteItem: jest.fn(() => mockedResponse),
}));

describe(`Test controller`, () => {
  beforeEach(() => jest.clearAllMocks());
  test("should server get request to get tasks from client and send mocked response", async () => {
    const response = await request(app).get("/getTasks");
    expect(response.statusCode).toBe(200);
    expect(response.ok).toBeTruthy();
    expect(response.body?.tasks[0]).toEqual(
      expect.objectContaining(mockedTask)
    );
  });
  test("should server get request to get tasks from client but throw error 'Error from database'", async () => {
    jest.spyOn(services, "getItems").mockImplementation(() => {
      throw "Error from database";
    });
    const response = await request(app).get("/getTasks");
    expect(response.text).toEqual("Error from database");
  });
  test("should server get request to add new task from client and send success message in mocked response", async () => {
    mockedResponse.statusCode = 201;
    mockedResponse.message = "New task added successfully";
    const response = await request(app)
      .post("/addTask")
      .send({ task: mockedTask });
    expect(response.statusCode).toBe(201);
    expect(response.ok).toBeTruthy();
    expect(response.body.message).toEqual("New task added successfully");
  });
  test("should server get request to add new task with undefined task and respond with 'Task is not defined' message", async () => {
    const response = await request(app)
      .post("/addTask")
      .send({ noTask: "undefined task" });
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual("Task is not defined");
  });
  test("should server get request to edit a task from client and send success message in mocked response", async () => {
    mockedResponse.statusCode = 201;
    mockedResponse.message = "Task editted successfully";
    const response = await request(app)
      .put("/editTask")
      .send({ task: mockedTask });
    expect(response.statusCode).toBe(201);
    expect(response.ok).toBeTruthy();
    expect(response.body.message).toEqual("Task editted successfully");
  });
  test("should server get request to edit a task with undefined task and respond with 'Task is not defined' message", async () => {
    const response = await request(app)
      .put("/editTask")
      .send({ noTask: "undefined task" });
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual("Task is not defined");
  });
  test("should server get request to delete a task from client and send success message in mocked response", async () => {
    mockedTask.id = "mockedId";
    mockedResponse.statusCode = 204;
    mockedResponse.message = "Task has deleted successfully";
    const response = await request(app).delete("/deleteTask/mockedId");
    expect(response.statusCode).toBe(204);
    expect(response.ok).toBeTruthy();
  });
  test("should server get request to delete a task but throw error with message 'Error from database'", async () => {
    jest.spyOn(services, "deleteItem").mockImplementation(() => {
      throw "Error from database";
    });
    const response = await request(app).delete("/deleteTask/''");
    expect(response.statusCode).toBe(500);
    expect(response.text).toEqual("Error from database");
  });
});
