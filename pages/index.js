import useSWR from 'swr';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import ChildCard from '@/components/ChildCard';
import Spinner from '@/components/ui/Spinner';
import { useSession } from 'next-auth/react';
// Import the hooks we need for the parent component
import { useEffect, useState, useRef, useCallback } from 'react';
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

// Define the sticky trigger point here
const STICKY_THRESHOLD = 80;

export default function HomePage() {
  const { data: sessionData, status } = useSession();
  const router = useRouter();

  // --- All your existing data fetching and auth logic remains unchanged ---
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

  // --- NEW LOGIC TO MANAGE ALL STICKY HEADERS ---

  // Hold the title of current active header.
  const [activeHeaderTitle, setActiveHeaderTitle] = useState(null);
  // Refs for each section container:
  const childrenSectionRef = useRef(null);
  const tasksSectionRef = useRef(null);
  const mealsSectionRef = useRef(null);

  const handleScroll = useCallback(() => {
    const sectionRefs = {
      Children: childrenSectionRef.current,
      Tasks: tasksSectionRef.current,
      Meals: mealsSectionRef.current,
    };

    let newActiveTitle = null;

    // Find last section that has scrolled past the top.
    for (const title in sectionRefs) {
      const sectionEl = sectionRefs[title];
      if (sectionEl) {
        const rect = sectionEl.getBoundingClientRect();
        if (rect.top <= STICKY_THRESHOLD) {
          newActiveTitle = title;
        }
      }
    }

    if (newActiveTitle !== activeHeaderTitle) {
      setActiveHeaderTitle(newActiveTitle);
    }
  }, [activeHeaderTitle]);

  // 4. A single effect to add/remove the scroll listener.
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

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

      <SectionContainer ref={childrenSectionRef}>
        <SecondaryHeader isSticky={activeHeaderTitle === 'Children'}>Children</SecondaryHeader>
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

      <SectionContainer ref={tasksSectionRef}>
        <SecondaryHeader isSticky={activeHeaderTitle === 'Tasks'}>Tasks</SecondaryHeader>
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

      <SectionContainer ref={mealsSectionRef}>
        <SecondaryHeader isSticky={activeHeaderTitle === 'Meals'}>Meals</SecondaryHeader>
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
