import dbConnect from "@/db/connect";
import Task from "@/db/models/Task";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const tasks = await Task.find();

    response.status(200).json(tasks);
    console.log(tasks);
    return;
  }
  response.status(405).json({ error: "Method not allowed" });
}
