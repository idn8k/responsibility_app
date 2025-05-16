import React from 'react';
import styled from 'styled-components';

import Logo from './ui/Logo';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import Badge from './ui/Badge';

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
      <button onClick={() => signOut()}>Logout</button>
      <Logo />
    </StyledHeader>
  );
}
