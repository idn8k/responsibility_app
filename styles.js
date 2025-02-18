import styled, { createGlobalStyle } from "styled-components";

import { Roboto } from "next/font/google";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0 auto; 
    font-family: system-ui;
  }
`;
