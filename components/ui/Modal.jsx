import React from "react";
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
    background: rgba(0, 0, 0, 0.5);
  }

  h2 {
    color: #ff3566;
    font-size: 28px;

    margin: 0;
  }

  /* button {
    font-family: inherit;
    margin-top: 10px;
    padding: 10px;
    border: none;
    background-color: #0070f3;
    color: white;
    cursor: pointer;
    border-radius: 5px;

    &:hover {
      background-color: #005bb5;
    } */
  }
`;

const StyledBtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

export default function Modal({ dialogRef, closeModal, onDelete, childId }) {
  function handleDelete() {
    onDelete(childId);
    closeModal();
  }

  return (
    <dialog ref={dialogRef}>
      <h2>Delete child?</h2>
      <StyledBtnContainer>
        <button onClick={closeModal}>cancel</button>
        <button onClick={handleDelete}>Delete</button>
      </StyledBtnContainer>
    </dialog>
  );
}
