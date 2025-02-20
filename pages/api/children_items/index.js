import { childrenInfo } from "@/lib/db";

export default function handler(request, response) {
  if (request.method !== "GET") {
   response.status(405).json({ error: "Method not allowed" });
   return;
  }

  if (!childrenInfo) {
    response.status(500).json({ error: "Failed to retrieve children entries" });
    return;
  }

  response.status(200).json(childrenInfo);
  return;
}
