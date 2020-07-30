import styled from 'styled-components';

export const AppContainer = styled.div `
    max-width: 100vw;
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
    font-family: 'Over the Rainbow', cursive;
    font-size: 3rem;
    color: #f2f2f2;
    text-align: center;
`

export const Planner = styled.div `
    display: grid;
    align-items: flex-start;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-gap: 24px;
    
  @media screen and (max-width: 400px) {
      display: block;
  }
    
  @media screen and (max-width: 990px) and (min-width: 401px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    grid-gap: 24px;
  }
`

export const PlannerDay = styled.div `
    min-height: 240px;
    flex: 1;
    box-sizing: border-box;
`

export const PlannerTitle = styled.h3 `
    margin: 16px 0;
    padding: 8px;
    background-color: #CCB7D8;
    color: #f2f2f2;
    font-weight: 700;
    text-align: center;
    font-family: 'Over the Rainbow', cursive;
    box-sizing: border-box;
`

export const NoTaskMessage = styled.p `
    font-size: 12px;
    text-align: center;
    color: #CCB7D8;
`

export const TaskRow = styled.div `
    display: block;
    min-height: 20px;
    align-items: center;
    padding: 2px 8px;

    &:nth-child(even) {
        background-color: rgba(160, 160, 160, 0.05);
    }
`

export const HourSpan = styled.span`
    float: left;
    font-size: 12px;
    color: #CCB7D8;
`