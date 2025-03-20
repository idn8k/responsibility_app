import React from 'react';
import styled from 'styled-components';

import Logo from './ui/Logo';

const StyledHeader = styled.header`
  background: var(--primary-color);

  display: flex;
  justify-content: space-around;
  align-items: center;

  position: fixed;
  top: 0;
  z-index: 1;
  height: 80px;
  width: 100%;
`;

export default function Header() {
  return (
    <StyledHeader>
      <Logo />
    </StyledHeader>
  );
}
