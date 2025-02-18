import React from "react";
import styled from "styled-components";

import Logo from "./ui/Logo";

const StyledHeader = styled.header`
  background: #ff3566;

  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  z-index: 1;
  height: 80px;
  width: 100%;
`;

const StyledImage = styled.div`
  width: 100px;
  height: 100%;
  overflow: hidden;
  position: relative;
  border-radius: 20px;

  img {
    object-fit: cover;
  }
`;

export default function Header() {
  return (
    <StyledHeader>
      <Logo />
    </StyledHeader>
  );
}
