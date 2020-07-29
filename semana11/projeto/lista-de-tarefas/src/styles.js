import styled from 'styled-components';

export const AppContainer = styled.div `
    width: 100vw;
    min-height: 100vh;
    margin: 0;
    background-color: #f2f2f2;
    box-sizing: border-box;
`

export const Header = styled.div `
    padding: 24px;
    background-color: #CCB7D8;
`

export const HeaderTitle = styled.h1 `
    margin: 0;
    font-family: 'Patrick Hand', cursive;
    font-size: 4rem;
    color: #f2f2f2;
    text-align: center;
`

export const Planner = styled.div `
    display: grid;
    align-items: stretch;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-gap: 24px;
`

export const PlannerAddTask = styled.div `
    min-height: 240px;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    box-sizing: border-box;
`

export const Input = styled.textarea `
    margin: 16px 0;
    min-width: 160px;
    min-height: 80px;
    padding: 8px;
    border: none;
    border-radius: 8px;
    box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.10);
`

export const Select = styled.select `
    min-width: 160px;
    padding: 8px;
    border: none;
    border-radius: 8px;
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

export const PlannerQtd = styled.p `
    width: 100%;
    margin: 0;
    padding: 8px;
    background-color: #CCB7D8;
    color: #f2f2f2;
    font-weight: 700;
    text-align: center;
    box-sizing: border-box;
    font-family: 'Patrick Hand', cursive;
    font-size: 1.5rem;
`

export const PlannerDay = styled.div `
    min-height: 240px;
    flex: 1;
    box-sizing: border-box;
`

export const PlannerTitle = styled.h3 `
    padding: 8px;
    background-color: #CCB7D8;
    color: #f2f2f2;
    font-weight: 700;
    text-align: center;
    box-sizing: border-box;
    font-family: 'Patrick Hand', cursive;
    font-size: 1.5rem;
`