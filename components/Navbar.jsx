import React from "react";
import styled from "styled-components";

const StyledNavbar = styled.nav`
  background: #ff3566;

  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  bottom: 0;
  height: 80px;
  width: 100%;
`;

export default function Navbar() {
  return <StyledNavbar>Navbar</StyledNavbar>;
}
