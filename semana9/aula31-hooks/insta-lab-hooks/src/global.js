import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  button {
      padding: 8px;
      background-color: #4e4e4e;
      border-radius: 4px;
      border: none;
      box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
      color: #fff;
      font-weight: 700;
      cursor: pointer;
  }
  input {
      padding: 8px;
      border-radius: 4px;
      border: none;
      box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
  }
`