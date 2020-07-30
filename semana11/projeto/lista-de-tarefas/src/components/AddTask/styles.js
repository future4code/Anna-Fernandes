import styled from 'styled-components';

export const PlannerAddTask = styled.div `
    min-height: 240px;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
`

export const Input = styled.textarea `
    margin: 16px 0;
    min-width: 200px;
    min-height: 80px;
    padding: 8px;
    border: none;
    border-radius: 4px;
    box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.10);
`

export const Select = styled.select `
    min-width: 200px;
    margin: 4px auto;
    padding: 8px;
    border-radius: 4px;
    box-shadow:  0 0 2px 1px rgba(0, 0, 0, 0.10);
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

export const PlannerQtd = styled.h3`
    width: 100%;
    margin: 16px 0;
    padding: 8px;
    background-color: #CCB7D8;
    color: #f2f2f2;
    font-weight: 700;
    text-align: center;
    font-family: 'Over the Rainbow', cursive;
`

export const Label = styled.label `
    display: none;
`
