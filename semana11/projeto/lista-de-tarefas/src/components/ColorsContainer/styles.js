import styled from 'styled-components';

export const ColorsBoxContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background-color: #e5e5e5;
    transition: all 0.3s ease-in-out;
`

export const ColorBox = styled.div`
    display: inline-block;
    margin: 8px;
    width: 20px;
    height: 20px;
    padding-left: 8px;
    cursor: pointer;
    background-color: ${ props => { 
        if( props.blue ) {
            return '#4FC0ED'
        } else if ( props.dark ) {
            return '#4e4e4e'
        } else {
            return '#CCB7D8'
        }
    }}; 
`
