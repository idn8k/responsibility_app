import SectionContainer from '@/components/SectionContainer';
import TaskCard from '@/components/TaskCard';
import Spinner from '@/components/ui/Spinner';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import useSWR from 'swr';

const StyledUl = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  width: 100%;
  padding: 0 0 100px 0;
`;

const StyledHeading = styled.h2`
  color: var(--primary-color);
  background: #fff;
  width: 100%;
  text-align: center;
  margin: 20px 0 40px 0;

  font-size: 28px;
  z-index: 99;
`;
export default function AllTasksPage({ handleCompleteTask }) {
  const { data: tasksData, isLoading } = useSWR('/api/tasks_items');

  if (isLoading) return <Spinner />;
  if (tasksData.length === 0) return <h2>No tasks yet...</h2>;

  return (
    <SectionContainer>
      {/* TODO: apply SecondaryHeader ↓ */}
      <StyledHeading>Tasks</StyledHeading>
      <StyledUl>
        {tasksData?.map((task) => (
          <TaskCard key={task._id} toggleComplete={handleCompleteTask} task={task} />
        ))}
      </StyledUl>
    </SectionContainer>
  );
}
