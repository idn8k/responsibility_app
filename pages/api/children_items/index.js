import { childrenInfo } from "@/lib/db";

export default function handler(request, response) {
  response.status(200).json(childrenInfo);
}
