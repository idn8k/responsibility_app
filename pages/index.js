import useSWR from 'swr';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import ChildCard from '@/components/ChildCard';
import Spinner from '@/components/ui/Spinner';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import Button from '@/components/ui/Button';
import SecondaryHeader from '@/components/SecondaryHeading';
import SectionContainer from '@/components/SectionContainer';

const StyledUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const StyledContainer = styled.div`
  margin: 200px;
  width: 50%;
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
      <SectionContainer>
        <SecondaryHeader>Children</SecondaryHeader>
        <StyledUl>
          {childrenToRender?.map((child) => (
            <ChildCard
              key={child._id}
              child={child}
              tasks={tasksToRender.filter((task) => task.assignee._id === child._id)}
            />
          ))}
        </StyledUl>
      </SectionContainer>
      <SectionContainer>
        <SecondaryHeader>Children</SecondaryHeader>
        <StyledUl>
          {childrenToRender?.map((child) => (
            <ChildCard
              key={child._id}
              child={child}
              tasks={tasksToRender.filter((task) => task.assignee._id === child._id)}
            />
          ))}
        </StyledUl>
      </SectionContainer>
    </>
  );
}
