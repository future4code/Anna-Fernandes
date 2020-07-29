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