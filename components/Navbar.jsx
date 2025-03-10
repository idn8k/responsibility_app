import React, { useState } from "react";
import styled from "styled-components";

import { FaThList, FaPlus } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";

import Link from "next/link";
import ModalJunction from "./ui/ModalJunction";

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

const StyledBtn = styled.button`
  background: none;
  border: none;
`;

export default function Navbar({ adminMode }) {
  const [isModalOpen, setModalOpen] = useState(false);

  function openModal() {
    setModalOpen(true);
  }
  function closeModal() {
    setModalOpen(false);
  }

  if (!adminMode) {
    return (
      <StyledNavbar>
        <Link href="/">
          <GoHomeFill color="white" size="2.8rem" />
        </Link>
      </StyledNavbar>
    );
  }

  return (
    <StyledNavbar>
      <StyledBtn onClick={openModal}>
        <FaPlus color="white" size="2.5rem" />
      </StyledBtn>
      <Link href="/">
        <GoHomeFill color="white" size="2.8rem" />
      </Link>
      <Link href="/tasksPage">
        <FaThList color="white" size="2rem" />
      </Link>
      <ModalJunction
        setModal={setModalOpen}
        closeModal={closeModal}
        isOpen={isModalOpen}
      />
    </StyledNavbar>
  );
}
