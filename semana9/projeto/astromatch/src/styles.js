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
    background-image: linear-gradient(to right top, #f52d51, #ec274b, #e22045, #d9193f, #d01039);
    overflow: hidden;
`

export const Header = styled.div `
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0;
    padding: 8px;
`

export const HeaderLogo = styled.img `
    width: 160px;
    margin: 0;
    padding: 0;
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
    border: 2px solid #D90B31;
    border-radius: 8px;
    font-weight: 700;
    color: #D90B31; 
    cursor: pointer;
    transition: color 0.3s ease;
    &:hover {
        background-color: #D90B31;
        color: #fff; 
    }
`