import React from "react";
import styled from "styled-components";

const StyledMainContainer = styled.main`
  height: 100vh;
  margin: 40px 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 80px;
  overflow-y: auto;
`;

export default function MainContainer({ children }) {
  return <StyledMainContainer>{children}</StyledMainContainer>;
}
