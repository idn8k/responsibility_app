import mongoose from "mongoose";

const { Schema } = mongoose;

const taskSchema = new Schema({
  taskName: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
  assignee: { type: Schema.Types.ObjectId, ref: "Child" },
});

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;
