import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import CustomCheckbox from './ui/CustomCheckbox';

const StyledTaskContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border: solid 1px var(--primary-color);
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.06);

  width: 80%;
  padding: 6px 22px;
  border-radius: 16px;
`;

const StyledTaskName = styled.p`
  font-size: 22px;
  width: 60%;
  height: 24px;
  line-height: 24px;
`;

const ImageWrapper = styled.div`
  height: 60px;
  width: 60px;
  position: relative;
  overflow: hidden;
  border-radius: 8px;

  img {
    object-fit: cover;
  }
`;

export default function TaskCard({ task, toggleComplete, pathname }) {
  const { taskName, _id: taskId } = task;
  const { imgUrl: childImg } = task.assignee;
  console.log('pathname:', pathname);
  console.log(pathname === '/child/[id]');

  function handleToggleComplete(taskId) {
    toggleComplete(taskId);
  }

  return (
    <StyledTaskContainer>
      {pathname !== '/child/[id]' && (
        <ImageWrapper>
          <Image width="60" height="60" src={childImg} alt="Child image" priority />
        </ImageWrapper>
      )}

      <StyledTaskName>{taskName}</StyledTaskName>
      <CustomCheckbox
        checked={task.isCompleted}
        label="Task checkbox"
        onChange={() => handleToggleComplete(taskId)}
      />
    </StyledTaskContainer>
  );
}
