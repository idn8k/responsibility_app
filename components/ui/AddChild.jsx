import React from "react";
import styled from "styled-components";

const StyledBtn = styled.button`
  height: 250px;
  width: 250px;
  background: #60b2e5;
  border: none;
  border-radius: 50%;
  color: #fff;
  font-size: 38px;
`;

export default function AddChild() {
  return <StyledBtn>Add child</StyledBtn>;
}
