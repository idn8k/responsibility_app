// import { childrenInfo } from "../../../../lib/db.js";

// export default function handler(request, response) {
//   const { id } = request.query;

//   const childData = childrenInfo.find((child_item) => child_item.id === id);
//   console.log("handler ~ childData:", childData);

//   if (!childrenInfo) {
//     response.status(404).json({ status: "Not found" });
//     return;
//   }

//   response.status(200).json(childData);
// }
