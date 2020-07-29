import styled from 'styled-components';

export const TaskText = styled.p `
    text-decoration: ${ props => { 
    if( props.complete ) {
        return 'line-through'
    } else {
        return 'none'
    }
    }}; 
`
export const Button = styled.button `
    margin: 16px 0;
    min-width: 160px;
    padding: 8px;
    border: none;
    border-radius: 8px;
    box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.10);
    background-color: #CCB7D8;
    color: #f2f2f2;
    font-weight: 700;
`
