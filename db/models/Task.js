import mongoose from "mongoose";

const { Schema } = mongoose;

const taskSchema = new Schema({
  taskName: { type: String, required: true },
  assignee: { type: String, required: true },
  isCompleted: { type: Boolean, required: true },
});

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;
