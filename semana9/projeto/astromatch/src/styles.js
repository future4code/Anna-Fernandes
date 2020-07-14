import styled from 'styled-components';

export const Screen = styled.div `
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const AppContainer = styled.div `
    width: 320px;
    height: 80vh;
    border-radius: 8px;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
    overflow: hidden;
`

export const Header = styled.div `
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0;
    padding: 8px 16px;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
`

export const HeaderLogo = styled.h3 `
    margin: 0;
    padding: 0;
    color: #04BFAD;
`

export const PageBtn = styled.button `
    width: 40px;
    height: 24px;
    border: none;
    background-color: transparent;
    transition: all 0.3 ease;
    &:focus {
        outline: none;
    }
    &:hover {
        transform: scale(1.05);
    }
`

export const ResetBtn = styled.div `
    margin-top: 8px;
    padding: 8px;
    background-color: #D90B31;
    border-radius: 8px;
    color: #fff;
    font-weight: 700;
    cursor: pointer;
`