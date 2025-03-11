import React from "react";
import styled from "styled-components";

const StyledBtn = styled.button`
  height: 250px;
  width: 250px;
  background: var(--primary-color);
  border: none;
  border-radius: 50%;
  color: #fff;
  font-size: 38px;

  transition: background-color 0.3s, transform 0.2s;

  &:hover,
  &:active {
    background-color: var(--primary-color);
    color: white;
  }
`;

export default function AddChild() {
  return <StyledBtn>Add child</StyledBtn>;
}
