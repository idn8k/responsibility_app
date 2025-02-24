import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import { FaThList, FaPlus } from "react-icons/fa";
import Link from "next/link";

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
  const [showPlusIcon, setIcon] = useState(false);
  const { pathname } = useRouter();
  useEffect(() => {
    setIcon(pathname === "/addChildPage");
  }, [pathname, showPlusIcon]);

  return (
    <StyledNavbar>
      <Link href="/addChildPage">
        {!showPlusIcon && <FaPlus color="white" size="2rem" />}
      </Link>
    </StyledNavbar>
  );
}
