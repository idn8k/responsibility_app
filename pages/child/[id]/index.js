import Spinner from '@/components/ui/Spinner';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import useSWR from 'swr';

import ModalDelete from '@/components/ui/ModalDelete';

import { useState } from 'react';
import TaskCard from '@/components/TaskCard';
import ChildOperation from '@/components/ui/ChildOperation';

const StyledContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: fixed;
  top: 80px;

  width: 100%;
  height: 120px;
  padding: 0 40px;
  background-color: #fff;

  z-index: 100;
`;

const StyledHeading = styled.h3`
  position: fixed;
  z-index: 99;
  background: #fff;
  top: 200px;
  width: 100%;
  text-align: center;
  padding: 10px 0;
  margin: 0;
  font-size: 28px;
  color: var(--primary-color);
  box-shadow: 0px 3px 4px -2px rgba(0, 0, 0, 0.1);
`;

const ImageWrapper = styled.div`
  width: 60px;
  height: 60px;
  overflow: hidden;
  position: relative;
  border-radius: 20px;

  img {
    object-fit: cover;
  }
`;

const StyledName = styled.span`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 42px;
  color: var(--primary-color);
  background-color:;
`;

const StyledUl = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  margin: 300px 0 100px 0;
  width: 100%;
  padding: 0 0 100px 0;
`;

// - CHILD SLUG -//

export default function Child({ handleCompleteTask }) {
  const router = useRouter();
  const pathname = router.pathname;
  const { id } = router.query;

  const [childId, setChildId] = useState(null);
  const { data: tasks, isLoading: isLoadingTasks } = useSWR('/api/tasks_items');
  const { data: child, isLoading: isLoadingChild } = useSWR(`/api/child_items/${id}`);

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  function openDeleteModalFunction(id) {
    setChildId(id);
    setDeleteModalOpen(true);
  }
  function closeModal() {
    setDeleteModalOpen(false);
  }

  async function handleDelete(id) {
    const response = await fetch(`/api/child_items/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      return;
    }
    router.push('/');
  }

  if (isLoadingChild || isLoadingTasks) return <Spinner />;
  if (!child) return;

  const childTasks = tasks.filter((task) => task.assignee._id === id);

  return (
    <>
      <StyledContainer>
        <ImageWrapper>
          <Image
            style={{ objectFit: 'cover' }}
            priority
            sizes="(max-width: 768px) 100vw, 33vw"
            fill
            src={child.imgUrl}
            alt="Child image"
          />
        </ImageWrapper>
        <StyledName>{child.name.charAt(0).toUpperCase() + child.name.slice(1)}</StyledName>

        <ChildOperation
          openDeleteModalFunction={openDeleteModalFunction}
          isDeleteModalOpen={isDeleteModalOpen}
        />
      </StyledContainer>
      <StyledHeading>Tasks</StyledHeading>
      <StyledUl>
        {childTasks?.map((task) => (
          <TaskCard
            key={task._id}
            pathname={pathname}
            toggleComplete={handleCompleteTask}
            task={task}
          />
        ))}
      </StyledUl>

      <ModalDelete
        onDelete={handleDelete}
        closeModal={closeModal}
        childId={childId}
        isOpen={isDeleteModalOpen}
      />
    </>
  );
}
