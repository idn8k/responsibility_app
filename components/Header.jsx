import React from 'react';
import styled from 'styled-components';

import AOLogo from '../assets/ao-logo.svg';
import { signOut } from 'next-auth/react';

const StyledHeader = styled.header`
  background: white;

  box-shadow: 0px 3px 2px 0px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-around;
  align-items: center;

  position: fixed;
  top: 0;
  z-index: 990;
  height: 80px;
  width: 100%;
`;

const LogoutBtn = styled.button`
  position: absolute;
  left: 20px;
`;

export default function Header() {
  return (
    <StyledHeader>
      <LogoutBtn onClick={() => signOut()}>Logout</LogoutBtn>
      <AOLogo />
    </StyledHeader>
  );
}
