import useSWR from 'swr';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import ChildCard from '@/components/ChildCard';
import Spinner from '@/components/ui/Spinner';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import Button from '@/components/ui/Button';

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

const StyledContainer = styled.div`
  margin: 200px;
  width: 50%;
`;

const StyledParagraph = styled.p`
  color: var(--primary-color);
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
  const { data: sessionData, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  const {
    data: childrenData,
    isLoading: isLoadingChildren,
    error: childrenError,
  } = useSWR('/api/child_items', {
    fallbackData: [],
  });

  const {
    data: tasksData,
    isLoading: isLoadingTasks,
    error: tasksError,
  } = useSWR('/api/tasks_items', {
    fallbackData: [],
  });

  useEffect(() => {
    if (status !== 'unauthenticated') return;

    if (!isLoadingChildren && childrenData && childrenData.length === 0) {
      router.push('addChildPage');
    }
  }, [childrenData, isLoadingChildren, status, router]);

  if (status === 'loading' || isLoadingChildren || isLoadingTasks) {
    return <Spinner />;
  }

  if (childrenError || tasksError) {
    return <div>Error loading data. Please try again later.</div>;
  }

  const childrenToRender = childrenData || [];
  const tasksToRender = tasksData || [];

  return (
    <>
      {!childrenToRender.length && (
        <StyledContainer>
          <Button onClick={() => router.push('/addChildPage')}>Add your first child</Button>
        </StyledContainer>
      )}
      <StyledUl>
        {childrenToRender?.map((child) => (
          <StyledLi key={child._id}>
            <StyledLink href={`/child/${child._id}`}>
              <ChildCard
                child={child}
                tasks={tasksToRender.filter((task) => task.assignee._id === child._id)}
              />
            </StyledLink>
          </StyledLi>
        ))}
      </StyledUl>
    </>
  );
}
