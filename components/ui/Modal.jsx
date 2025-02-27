import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Button from "./Button";

const StyledDialog = styled.dialog`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 60%;
  height: 200px;
  padding: 20px;
  border: none;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);

  &::backdrop {
    background: rgba(0, 0, 0, 0.4);
  }

  h2 {
    color: #ff3566;
    font-size: 28px;

    margin: 0;
  }
`;

const StyledBtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

export default function Modal({ isOpen, closeModal, onDelete, childId }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.clode();
    }
  }, [isOpen]);

  function handleDelete() {
    onDelete(childId);
    closeModal();
  }

  if (!isOpen) return null;

  return (
    <StyledDialog ref={dialogRef}>
      <h2>Delete child?</h2>
      <StyledBtnContainer>
        <Button onClick={closeModal}>cancel</Button>
        <Button type="fill" onClick={handleDelete}>
          Delete
        </Button>
      </StyledBtnContainer>
    </StyledDialog>
  );
}
