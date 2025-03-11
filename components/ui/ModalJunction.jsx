import Link from "next/link";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const StyledDialog = styled.dialog`
  width: 80%;
  height: 200px;
  padding: 30px 25px;
  border: none;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);

  &::backdrop {
    background: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(0.5px);
  }

  h2 {
    color: #ff3566;
    font-size: 28px;
    margin: 0;
  }
  & > div {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
`;

const StyledBtnContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StyledLink = styled(Link)`
  width: 100%;
  background: white;
  border: solid 1px var(--primary-color);
  padding: 15px 0;
  border-radius: 12px;
  font-size: 22px;
  text-decoration: none;
  text-align: center;
  transition: background-color 0.3s, transform 0.2s;

  &:visited {
    color: darkslategrey;
  }
  &:hover {
    transform: scale(0.98);
    background-color: var(--primary-color);
    color: white;
  }
`;

export default function ModalJunction({ isOpen, closeModal, setModal }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  function handleClose() {
    if (!dialogRef.current) {
      return;
    }

    dialogRef.current.close();
    setModal(false);
  }

  return (
    <StyledDialog ref={dialogRef} onClick={handleClose}>
      <div>
        <StyledBtnContainer>
          <StyledLink onClick={closeModal} href="/addChildPage">
            Add Child
          </StyledLink>
          <StyledLink onClick={closeModal} href="/addTaskPage">
            Add Task
          </StyledLink>
        </StyledBtnContainer>
      </div>
    </StyledDialog>
  );
}
