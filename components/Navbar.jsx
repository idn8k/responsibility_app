import React, { useState } from 'react';
import styled from 'styled-components';

import { GoHomeFill } from 'react-icons/go';

import Link from 'next/link';
import ModalJunction from './ui/ModalJunction';
import { FaSquare, FaThList, FaPlusSquare } from 'react-icons/fa';
import { useRouter } from 'next/router';

const StyledNavbar = styled.nav`
  background: var(--primary-color);

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 56px;
  position: fixed;
  bottom: 0;
  height: 80px;
  width: 100vw;
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  background: none;
  border: none;
  margin: 0;
  padding: 0;
  color: ${(props) => (props.active ? 'white' : 'var(--primary-color-light)')};
`;

const StyledBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  background: none;
  border: none;
  margin: 0;
  padding: 0;
  text-align: center;
`;

export default function Navbar({ adminMode }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const { pathname } = useRouter();

  console.log(pathname);

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
        <FaPlusSquare
          color={
            pathname === '/addChildPage' || pathname === '/addTaskPage'
              ? 'white'
              : 'var(--primary-color-light)'
          }
          size="2.2rem"
        />
      </StyledBtn>
      <StyledLink active={pathname === '/'} href="/">
        <FaSquare size="2.2rem" />
      </StyledLink>
      <StyledLink active={pathname === '/tasksPage'} href="/tasksPage">
        <FaThList size="2rem" />
      </StyledLink>
      <ModalJunction
        setModal={setModalOpen}
        closeModal={closeModal}
        isOpen={isModalOpen}
      />
    </StyledNavbar>
  );
}
