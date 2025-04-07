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

const StyledChildName = styled.h2`
  z-index: 99;
  font-size: 36px;
  color: var(--primary-color);
  text-align: center;
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
`;

const StyledButton = styled.button`
  border: none;
  background: none;
  height: 80px;
  width: 80px;
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

// - SLUG -//

export default function Child({ handleCompleteTask }) {
  const router = useRouter();
  const pathname = router.pathname;
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
  console.log(pathname);

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
        {/* <StyledChildName>{child.name}</StyledChildName> */}
        <StyledName>{child.name.charAt(0).toUpperCase() + child.name.slice(1)}</StyledName>

        {/* <Link href={`/child/${id}/editChild`}>
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
        </StyledButton> */}
        <StyledButton>
          <ImMenu size="2rem" color="ff3566" />
        </StyledButton>
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
        isOpen={isModalOpen}
      />
    </>
  );
}
