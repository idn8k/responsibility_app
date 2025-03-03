import React from "react";
import styled from "styled-components";

const StyledTaskContainer = styled.div`
  display: flex;
  justify-content: space-around;
  background: lightblue;
  width: 80%;
  padding: 6px 12px;
  border-radius: 16px;
`;

export default function TaskCard({ task }) {
  const { taskName } = task;
  return (
    <StyledTaskContainer>
      <p>{taskName}</p>
      <input type="checkbox" />
    </StyledTaskContainer>
  );
}
