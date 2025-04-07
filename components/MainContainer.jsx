import React from 'react';
import styled from 'styled-components';

const StyledMainContainer = styled.main`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 80px;
  padding: 100px 0;
`;

export default function MainContainer({ children }) {
  return <StyledMainContainer>{children}</StyledMainContainer>;
}
