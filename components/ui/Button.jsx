import React from "react";
import styled from "styled-components";

const StyledBtn = styled.button`
  background-color: ${(props) =>
    props.fill ? "var(--primary-color)" : "#fff"};
  color: ${(props) => (props.fill ? "#fff" : "var(--primary-color)")};
  border: 1px solid var(--primary-color);
  width: 45%;
  padding: 10px 0;
  border-radius: 10px;
  cursor: pointer;
  font-size: 20px;
  transition: background-color 0.3s, transform 0.2s;

  &:hover,
  &:active {
    transform: scale(0.95);
    background-color: var(--primary-color);
    color: white;
  }
`;

export default function Button({ children, onClick, type }) {
  return (
    <StyledBtn fill={type} onClick={onClick}>
      {children}
    </StyledBtn>
  );
}
