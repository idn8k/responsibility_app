import TaskCard from '@/components/TaskCard';
import Spinner from '@/components/ui/Spinner';
import styled from 'styled-components';
import useSWR from 'swr';

const StyledUl = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  width: 100%;
  padding: 30px 0;
`;

const StyledHeading = styled.h2`
  position: fixed;
  z-index: 99;
  background: #fff;
  top: 80px;
  width: 100%;
  text-align: center;
  padding: 20px 0;
  margin: 0;
  font-size: 28px;
  color: var(--primary-color);
  box-shadow: 0px 3px 4px -2px rgba(0, 0, 0, 0.1);
`;
export default function TasksPage({ handleCompleteTask }) {
  const { data: tasksData, isLoading } = useSWR('/api/tasks_items');

  if (isLoading) return <Spinner />;
  if (tasksData.length === 0) return <h2>No tasks yet...</h2>;

  return (
    <>
      <StyledHeading>Tasks</StyledHeading>
      <StyledUl>
        {tasksData?.map((task) => (
          <TaskCard key={task._id} toggleComplete={handleCompleteTask} task={task} />
        ))}
      </StyledUl>
    </>
  );
}
