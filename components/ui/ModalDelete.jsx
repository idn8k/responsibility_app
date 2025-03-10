import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Button from "./Button";

const StyledDialog = styled.dialog`
  width: 60%;
  height: 200px;
  padding: 30px 25px;
  border: none;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);

  &::backdrop {
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(0.8px);
  }

  h2 {
    color: var(--primary-color);
    font-size: 28px;
    margin: 0;
  }
  & > div {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
`;

const StyledBtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export default function ModalDelete({ isOpen, closeModal, onDelete, childId }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  function handleDelete() {
    onDelete(childId);
    closeModal();
  }

  function handleClose() {
    if (!dialogRef.current) {
      return;
    }

    dialogRef.current.close();
  }

  return (
    <StyledDialog ref={dialogRef} onClick={handleClose}>
      <div>
        <h2>Delete child?</h2>
        <StyledBtnContainer>
          <Button onClick={closeModal}>cancel</Button>
          <Button type="fill" onClick={handleDelete}>
            Delete
          </Button>
        </StyledBtnContainer>
      </div>
    </StyledDialog>
  );
}
