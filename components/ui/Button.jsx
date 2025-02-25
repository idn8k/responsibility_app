import React from "react";
import styled from "styled-components";

const StyledBtn = styled.button`
  background-color: #ff3566;
  color: #fff;
  border: 1px solid #ff3566;
  width: 45%;
  padding: 10px 0;
  border-radius: 10px;
  cursor: pointer;
  font-size: 20px;
`;

export default function Button({ children }) {
  return <StyledBtn>{children}</StyledBtn>;
}
