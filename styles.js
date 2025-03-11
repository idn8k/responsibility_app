import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

:root{
  --primary-color-light:#ffc9cc;
  --primary-color:#fc777e;
  --primary-color-dark:#e1212b;
  --secondary-color-light:#9bb7f5;
  --secondary-color:#4c6fe9;
  --secondary-color-dark:#2a3bcb;
  --tertiary-color-light:#9aaeaa;
  --tertiary-color:#343f3e;
}

  *,
  *::before,
  *::after {
    box-sizing: border-box;

  }

  body {
    font-family: 'Poppins', system-ui, -apple-system;
    margin: 0;
    padding:0;
  }

  button{
    font-family: inherit;
    cursor: pointer;




  }

`;
