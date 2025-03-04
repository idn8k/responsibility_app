import TaskCard from "@/components/TaskCard";
import Spinner from "@/components/ui/Spinner";
import useSWR from "swr";

export default function TasksPage() {
  const { data: tasksData, isLoading } = useSWR("/api/tasks_items");

  if (isLoading) return <Spinner />;
  if (tasksData.length === 0) return <h2>No tasks yet...</h2>;

  return (
    <>
      <h2>Tasks</h2>
      <ul>
        {tasksData?.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </ul>
    </>
  );
}
