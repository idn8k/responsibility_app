import dbConnect from "@/db/connect";
import Child from "@/db/models/Child";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const children = await Child.find();

    response.status(200).json(children);
    console.log(children);

    return;
  }

  if (!children) {
    response.status(404).json({ status: "Not Found" });
    return;
  }

  response.status(405).json({ error: "Method not allowed" });
}
