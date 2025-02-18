import React from "react";
import styled from "styled-components";

const StyledMainContainer = styled.main`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

export default function MainContainer({ children }) {
  return <StyledMainContainer>{children}</StyledMainContainer>;
}
