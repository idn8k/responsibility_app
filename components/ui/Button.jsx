import React from "react";
import styled from "styled-components";

const StyledBtn = styled.button`
  background-color: ${(props) => (props.add ? "#ff3566" : "#fff")};
  color: ${(props) => (props.add ? "#fff" : "#ff3566")};
  border: solid 1px ${(props) => (props.add ? "#fff" : "#ff3566")};
  width: 45%;
  padding: 10px 0;
  border-radius: 10px;
  cursor: pointer;
  font-size: 20px;
`;

export default function Button({ children, add }) {
  return <StyledBtn add={add}>{children}</StyledBtn>;
}
