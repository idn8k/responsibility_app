import React from "react";
import styled from "styled-components";

import { FaThList } from "react-icons/fa";

const StyledNavbar = styled.nav`
  background: #ff3566;

  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  bottom: 0;
  height: 80px;
  width: 100vw;
`;

export default function Navbar() {
  return (
    <StyledNavbar>
      <FaThList color="white" size="2rem" />
    </StyledNavbar>
  );
}
