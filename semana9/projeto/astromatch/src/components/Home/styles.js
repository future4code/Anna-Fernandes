import styled, {keyframes} from 'styled-components';

export const HomeContainer = styled.div `
    width: 320px;
    height: calc(100% - 40px);
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    transition: all 0.3 ease-in-out;
    position: relative;
`

export const ImgHome = styled.img `
    max-width: 80%;
    display: block;
    margin: 16px auto;
`

export const IntroText = styled.p `
    padding: 16px;
    font-weight: 700;
    text-align: center;
    color: #fff;
`

export const Btn = styled.button `

    display: block;
    margin: 16px auto;
    padding: 8px;
    width: 80px;
    border-radius: 8px;
    border: none;
    font-weight: 700;
    color: #D90B31;
    background-color: #fff;
    cursor: pointer;
    transition: all 0.3 ease;
    &:focus {
        outline: none;
    }
    &:hover {
        opacity: 0.5;
    }
`
