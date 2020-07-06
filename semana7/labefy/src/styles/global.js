import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle` 
    @import url("@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;1,400&display=swap');");

  * {    
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;

    font-family: 'Lato', sans-serif!important;
  }

  button, p, h1, h2, h3, h4, h5, h6 {
    font-family: 'Lato', sans-serif!important;
    color: #f5f5f5;
  }

  input {
    font-family: 'Lato', sans-serif!important;
    margin-right: 4px;
    margin-bottom: 8px;
    padding: 8px;
    border: none;
    border-radius: 5px;
    box-shadow: inset 0px 0px 2px rgba(0, 0, 0, 0.5);

    flex: 1;
  }

  button {
    margin-left: 4px;
    margin-bottom: 8px;
    padding: 8px;
    border: none;
    border-radius: 5px;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
    background-color: #3F0059;
    font-weight: 700;
  }

  button:hover {
    background-color: #500078;
    cursor: pointer
  }

`;
export default GlobalStyle;