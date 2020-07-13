import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    border: none;
    outline: none;
  }
  
  img {
      width: 100%;
      max-height: 160px;
      object-fit: cover;
  }
  
  button {
      cursor: pointer;
  }
`