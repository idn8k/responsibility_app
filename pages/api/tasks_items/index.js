import dbConnect from "@/db/connect";
import Task from "@/db/models/Task";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const tasks = await Task.find().populate("assignee");

      response.status(200).json(tasks);
      return;
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "POST") {
    try {
      const taskData = request.body;

      await Task.create(taskData);
      response.status(200).json({ status: "Task created!" });
      return;
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }
  response.status(405).json({ error: "Method not allowed" });
}
