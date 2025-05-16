import useSWR from 'swr';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import ChildCard from '@/components/ChildCard';
import Spinner from '@/components/ui/Spinner';

import { useSession } from 'next-auth/react';

const StyledUl = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  margin: 100px 0 100px 0;
  width: 100%;
  padding: 0 0 100px 0;
`;

const StyledLi = styled.li`
  list-style-type: none;
  width: 80%;
  margin: 0;
  padding: 0;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;

  position: relative;

  width: 100%;
  min-height: 150px;
  padding: 10px;
  overflow: hidden;
  text-decoration: none;

  border-radius: 20px;
  background: #fff;
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.1);
`;

export default function HomePage() {
  const { data: session } = useSession();
  const router = useRouter();
  if (!session) router.push('/auth/signin');

  const { data: childrenData, isLoading: isLoadingChildren } = useSWR('/api/child_items', {
    fallbackData: [],
  });

  const { data: TasksData, isLoading: isLoadingTasks } = useSWR('/api/tasks_items', {
    fallbackData: [],
  });

  if (isLoadingChildren || isLoadingTasks) return <Spinner />;

  if (childrenData.length === 0) {
    router.push('/addChildPage');
  }

  console.log(TasksData);

  return (
    <StyledUl>
      {childrenData?.map((child) => (
        <StyledLi key={child._id}>
          <StyledLink href={`/child/${child._id}`}>
            <ChildCard child={child} />
          </StyledLink>
        </StyledLi>
      ))}
    </StyledUl>
  );
}
