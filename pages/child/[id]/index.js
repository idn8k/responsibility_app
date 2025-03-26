import Spinner from '@/components/ui/Spinner';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import useSWR from 'swr';
import TaskCard from '@/components/TaskCard';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 90%;
  height: 50vh;
`;

//-!! Child slug !!-//

const ImageWrapper = styled.div`
  width: 60px;
  height: 60px;
  overflow: hidden;
  position: relative;
  border-radius: 15px;

  img {
    object-fit: cover;
  }
`;
const StyledPageHeader = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 99;
  background: #fff;
  top: 80px;
  height: 100px;
  width: 100%;
  text-align: center;
  padding: 20px 0;
  margin: 0;
  font-size: 28px;
  color: var(--primary-color);
  box-shadow: 0px 3px 4px -2px rgba(0, 0, 0, 0.1);
`;
const StyledHeader = styled.h2`
  display: inline-block;
  margin: 0;
  background: #fff;
  text-align: center;
  font-size: 28px;
  color: var(--primary-color);
`;

const StyledUl = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  width: 100%;
  padding: 100px 0;
  top: 153px;
`;

export default function ChildPage({ handleCompleteTask }) {
  const router = useRouter();
  const { id } = router.query;
  const { data: child, isLoading: isLoadingChild } = useSWR(`/api/children_items/${id}`);
  const { data: tasks, isLoading: isLoadingTasks } = useSWR('/api/tasks_items');

  if (isLoadingChild || isLoadingTasks) return <Spinner />;
  if (!child) return;

  const childTasks = tasks.filter((task) => task.assignee._id === id);

  return (
    <StyledContainer>
      <StyledPageHeader>
        <ImageWrapper>
          <Image
            sizes="(max-width: 768px) 100vw, 33vw"
            fill
            priority
            src={child.imgUrl}
            alt="Child image"
          />
        </ImageWrapper>
        <StyledHeader>Tasks</StyledHeader>
      </StyledPageHeader>
      <StyledUl>
        {childTasks?.map((task) => (
          <TaskCard key={task._id} toggleComplete={handleCompleteTask} task={task} />
        ))}
      </StyledUl>
    </StyledContainer>
  );
}
