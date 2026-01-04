export type task = {
  id: string;
  name: string;
  description: string;
  priority: string;
  status: string;
  deadline: Date;
};
export type ResponseType = {
  statusCode: number;
  message: string;
  tasks: task[];
};
type addItemType = (task: task) =>  Promise<ResponseType|Error>;
export type getItemType = () =>  Promise<ResponseType|Error>;
export default addItemType;
