import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import { FaThList, FaPlus } from "react-icons/fa";
import Link from "next/link";

const StyledNavbar = styled.nav`
  background: #ff3566;

  display: flex;
  justify-content: space-around;
  align-items: center;

  position: fixed;
  bottom: 0;
  height: 80px;
  width: 100vw;
`;

export default function Navbar() {
  const { pathname } = useRouter();

  const showPlusIcon = pathname === "/addChildPage";

  return (
    <StyledNavbar>
      <Link href="/addChildPage">
        {!showPlusIcon && <FaPlus color="white" size="2rem" />}
      </Link>
      <Link href="/tasksPage">
        <FaThList color="white" size="2rem" />
      </Link>
    </StyledNavbar>
  );
}
