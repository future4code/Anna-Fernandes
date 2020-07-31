import styled from 'styled-components';

export const TaskText = styled.span `
    text-decoration: ${ props => { 
    if( props.checked ) {
        return 'line-through'
    } else {
        return 'none'
    }
    }}; 
`

export const DeleteBtn = styled.div `
    display: ${ props => { 
    if( props.isEditing ) {
        return 'none'
    } else {
        return 'block'
    }
    }}; 
`

export const IconBtn = styled.button `
    border: none;
    background-color: none;
    margin: 0 4px;
`

export const Icon = styled.img `
    height: 20px;
    cursor: pointer;
`

export const Label = styled.label `
    display: none;
`

export const TaskContainer = styled.div`
    padding-left: 8px;
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const TaskEdit = styled.form `
    display: flex;
    align-items: center;
    justify-items: center;
`

export const TaskCheck = styled.div `
    display: block;
    position: relative;
    padding-left: 28px;
    cursor: pointer;
    user-select: none;
    line-height: 16px;
    display: ${ props => { 
    if( props.isEditing ) {
        return 'none'
    } else {
        return 'inline'
    }
    }}; 
`

export const Checkmark = styled.span `
    position: absolute;
    top: 0;
    left: 0;
    height: 16px;
    width: 16px;
    background-color: ${props => {
        if (props.checked) {
            return "#2196F3";
        } else {
            return "#ffffff";
        }
    }};
    
    &:after {
        content: "";
        position: absolute;
        left: 4px;
        top: 0px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 3px 3px 0;
        transform: rotate(45deg);
    };
`

export const Input = styled.input `
    padding: 8px;
    border: none;
    border-radius: 4px;
    box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.10);
    box-sizing: border-box;
`

export const Select = styled.select `
    margin: 0 4px;
    padding: 8px;
    border: none;
    border-radius: 4px;
    box-shadow:  0 0 2px 1px rgba(0, 0, 0, 0.10);
    box-sizing: border-box;
`
