import styled, { createGlobalStyle } from "styled-components";

import { Roboto } from "next/font/google";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  
  body {
    font-family: system-ui;
    margin: 0;
    padding:0;
  }
`;
