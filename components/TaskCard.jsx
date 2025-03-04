import React from "react";
import styled from "styled-components";

const StyledTaskContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background: #fff;
  border: solid 1px #ff3566;
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.1);

  width: 80%;
  padding: 6px 22px;
  border-radius: 16px;
`;

const StyledTaskName = styled.p`
  font-size: 22px;
  height: 24px;
  line-height: 24px;
  text-align: center;
`;

export default function TaskCard({ task }) {
  const { taskName } = task;
  return (
    <StyledTaskContainer>
      <StyledTaskName>{taskName}</StyledTaskName>
    </StyledTaskContainer>
  );
}
