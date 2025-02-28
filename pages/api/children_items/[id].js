import dbConnect from "@/db/connect";
import Child from "@/db/models/Child";

export default async function handler(request, response) {
  await dbConnect();

  const { id } = request.query;

  if (request.method === "DELETE") {
    try {
      const deletedChild = await Child.findByIdAndDelete(id);
      if (!deletedChild) {
        return response.status(404).json({ error: "Child not found" });
      }
      response.status(200).json({ message: "Child deleted successfully!" });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }

    return;
  }

  if (request.method === "PUT") {
    try {
      const updateChild = request.body;
      await Child.findByIdAndUpdate(id, updateChild);
      return response.status(200).json({ message: "Child updated!" });
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: "Internal server error..." });
    }
    return;
  }

  response.status(405).json({ error: "Method not allowed" });
}
