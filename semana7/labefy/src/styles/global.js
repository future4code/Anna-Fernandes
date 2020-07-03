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

  button, p, input, h1, h2, h3, h4, h5, h6 {
    font-family: 'Lato', sans-serif!important;
  }

  img {
    max-height: 300px;
  }

  input {
    margin: 8px;
    padding: 8px;
    border: none;
    border-radius: 5px;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
  }

  button {
    margin: 8px;
    padding: 8px;
    border: none;
    border-radius: 5px;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
  }

`;
export default GlobalStyle;