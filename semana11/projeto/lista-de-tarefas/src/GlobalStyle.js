import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        border: none;
        outline: none;
        box-sizing: border-box;
    };
    
    body {
        color: ${props => (props.whiteColor ? 'white' : 'black')};
    };

    button {
        cursor: pointer;
    }
`
