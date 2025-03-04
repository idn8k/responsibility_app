import React from "react";
import styled from "styled-components";

const StyledMainContainer = styled.main`
  height: 100%;
  padding: 160px 0 100px 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 80px;
`;

export default function MainContainer({ children }) {
  return <StyledMainContainer>{children}</StyledMainContainer>;
}
