import { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import MenuButton from './MenuButton';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { FaRegEdit } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai';

const RelativeContainer = styled.div`
  position: relative;
  display: inline-block;
  height: 24px;
  width: 24px;
`;

const StyledDialog = styled.dialog`
  position: absolute;
  top: 24px;
  left: -107px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #fc777e;

  opacity: 0;
  transform: scale(0.5);
  pointer-events: none;

  border: none;
  border-radius: 20px 0 20px 20px;

  &::backdrop {
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(0.7px);
  }

  ${(props) =>
    props.$isOpen &&
    css`
      opacity: 1;
      transform: scale(1);
      pointer-events: auto;
    `}
`;

const StyledButton = styled.button`
  border: none;
  background-color: transparent;
  height: 50px;
  width: 50px;
  padding: 0;
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  height: 50px;
  width: 50px;
  padding: 0;
  padding-left: 7px;
`;

function ChildOperation({ openDeleteModalFunction }) {
  const dialogRef = useRef(null);
  const router = useRouter();
  const { id } = router.query;
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      dialogRef.current?.show();
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      dialogRef.current?.close();
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  function toggleChildOps(event) {
    setMenuOpen((menuOpen) => !menuOpen);
  }

  return (
    <RelativeContainer>
      <MenuButton menuOpen={menuOpen} toggleChildOps={toggleChildOps} />
      {menuOpen && (
        <StyledDialog ref={dialogRef} $isOpen={menuOpen}>
          <StyledLink href={`/child/${id}/editChild`}>
            <FaRegEdit size="1.8rem" color="#fff" />
          </StyledLink>
          <StyledButton
            onClick={(event) => {
              event.stopPropagation();
              event.preventDefault();
              openDeleteModalFunction(id);
            }}
          >
            <AiOutlineDelete size="2rem" color="#fff" />
          </StyledButton>
        </StyledDialog>
      )}
    </RelativeContainer>
  );
}

export default ChildOperation;
