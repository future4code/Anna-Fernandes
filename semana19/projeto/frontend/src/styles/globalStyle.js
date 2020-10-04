import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    background-color: #A65BD9;
    color: #F2E085;
  }
  img {
    width: 100%;
  }
  h1, h2, h3 {
    margin: 24px auto;
    font-weight: 700;
    color: #F2E085;
  }
`