import styled, { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    width: 100%;
    height: 100vh;
    background: lightgray;
    font-family: system-ui;
  }
`;
