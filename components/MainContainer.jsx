import React from 'react';
import styled from 'styled-components';

const StyledMainContainer = styled.main`
  height: 100%;
  padding: 130px 0;
  margin-bottom: 100px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  gap: 80px;
`;

export default function MainContainer({ children }) {
  return <StyledMainContainer>{children}</StyledMainContainer>;
}
