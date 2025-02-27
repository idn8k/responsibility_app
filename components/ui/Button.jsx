import React from "react";
import styled from "styled-components";

const StyledBtn = styled.button`
  background-color: ${(props) => (props.fill ? "#ff3566" : "#fff")};
  color: ${(props) => (props.fill ? "#fff" : "#ff3566")};
  border: 1px solid #ff3566;
  width: 45%;
  padding: 10px 0;
  border-radius: 10px;
  cursor: pointer;
  font-size: 20px;
`;

// const StyledBtn = styled.button`
//   background-color: #ff3566;
//   color: #fff;
//   border: 1px solid #ff3566;
//   width: 45%;
//   padding: 10px 0;
//   border-radius: 10px;
//   cursor: pointer;
//   font-size: 20px;
// `;

export default function Button({ children, onClick, type }) {
  return (
    <StyledBtn fill={type} onClick={onClick}>
      {children}
    </StyledBtn>
  );
}
