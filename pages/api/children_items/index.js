import { childrenInfo } from "@/lib/db";

export default function handler(request, response) {
  try {
    response.status(200).json(childrenInfo);
    if (!response.status) {
      console.log("Could not load children entries");
      response.status(405);
    }
  } catch (error) {
    console.log("ERROR:", error);
    response.status(404).json({ status: "Not Found..." });
  }
  response.status(405).json({ status: "Method not allowed..." });
}
