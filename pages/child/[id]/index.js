import Spinner from '@/components/ui/Spinner';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import useSWR from 'swr';
import { FaRegEdit } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai';
import { ImMenu } from 'react-icons/im';

import ModalDelete from '@/components/ui/ModalDelete';

import Link from 'next/link';
import { useState } from 'react';
import TaskCard from '@/components/TaskCard';

// const StyledContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: space-around;
//   align-items: center;
//   width: 90%;
//   height: 100vh;
//   background-color: grey;
// `;

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  position: fixed;
  top: 80px;

  width: 90%;
  height: 200px;
  background-color: lightgray;

  z-index: 100;
`;

const StyledHeading = styled.h2`
  position: fixed;
  z-index: 99;
  background: #fff;
  top: 280px;
  width: 100%;
  text-align: center;
  padding: 20px 0;
  margin: 0;
  font-size: 28px;
  color: var(--primary-color);
  box-shadow: 0px 3px 4px -2px rgba(0, 0, 0, 0.1);
`;

const ImageWrapper = styled.div`
  width: 150px;
  height: 150px;
  overflow: hidden;
  position: relative;
  border-radius: 20px;

  img {
    object-fit: cover;
  }
`;

const StyledName = styled.span`
  font-size: 42px;
  /* font-weight: bold; */
  color: var(--primary-color);
  width: 50%;
  text-align: center;
`;

const StyledButton = styled.button`
  border: none;
  background: none;
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

// - SLUG -//

export default function Child({ handleCompleteTask }) {
  const router = useRouter();
  const { id } = router.query;

  const [childId, setChildId] = useState(null);
  const { data: tasks, isLoading: isLoadingTasks } = useSWR('/api/tasks_items');
  const { data: child, isLoading: isLoadingChild } = useSWR(`/api/child_items/${id}`);
  const [isModalOpen, setModalOpen] = useState(false);

  function openModal(id) {
    setChildId(id);
    setModalOpen(true);
  }
  function closeModal() {
    setModalOpen(false);
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

        <Link href={`/child/${id}/editChild`}>
          <FaRegEdit size="2rem" color="ff3566" />
        </Link>
        <StyledButton
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
            openModal(child._id);
          }}
        >
          <AiOutlineDelete size="2rem" color="ff3566" />
        </StyledButton>
        <StyledButton>
          <ImMenu size="2rem" color="ff3566" />
        </StyledButton>
      </StyledContainer>
      <StyledHeading>Tasks</StyledHeading>
      <StyledUl>
        {childTasks?.map((task) => (
          <TaskCard key={task._id} toggleComplete={handleCompleteTask} task={task} />
        ))}
      </StyledUl>

      <ModalDelete
        onDelete={handleDelete}
        closeModal={closeModal}
        childId={childId}
        isOpen={isModalOpen}
      />
    </>
  );
}
