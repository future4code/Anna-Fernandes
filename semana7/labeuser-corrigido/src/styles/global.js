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

`;
export default GlobalStyle;