import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import MenuButton from './MenuButton';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaRegEdit } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai';

const RelativeContainer = styled.div`
  position: relative;
  transition: transform 0.3s ease-in-out;
`;

const StyledDialog = styled.dialog`
  position: absolute;
  bottom: 500px;
  left: 185px;

  display: flex;
  flex-direction: column;
  gap: 10px;

  border: none;
  border-radius: 20px 0 20px 20px;
`;

const StyledButton = styled.button`
  border: none;
  background: none;
  height: 50px;
  width: 50px;
  padding: 0;
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: none;
  height: 50px;
  width: 50px;
  padding: 0;
  padding-left: 7px;
`;

function ChildOperation({ openDeleteModalFunction }) {
  const dialogRef = useRef(null);
  const router = useRouter();
  const { id } = router.query;
  const [childOpsOpen, setChildOpsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (childOpsOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [childOpsOpen]);

  function handleClose() {
    if (!dialogRef.current) {
      return;
    }

    dialogRef.current.close();
    setChildOpsOpen(false);
    setMenuOpen(false);
  }

  function toggleChildOps(event) {
    event.stopPropagation();
    setMenuOpen((menuOpen) => !menuOpen);
    setChildOpsOpen((childOpsOpen) => !childOpsOpen);
  }

  return (
    <RelativeContainer>
      <MenuButton menuOpen={menuOpen} toggleChildOps={toggleChildOps} />
      <StyledDialog onClick={handleClose} ref={dialogRef}>
        <StyledLink href={`/child/${id}/editChild`}>
          <FaRegEdit size="1.8rem" color="ff3566" />
        </StyledLink>
        <StyledButton
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
            openDeleteModalFunction(child._id);
          }}
        >
          <AiOutlineDelete size="2rem" color="ff3566" />
        </StyledButton>
      </StyledDialog>
    </RelativeContainer>
  );
}

export default ChildOperation;
