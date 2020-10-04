import styled from 'styled-components';

export const MainContainer = styled.div `
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    padding-top: 80px;
`

export const CenterObjects = styled.div `
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px;
`

export const Grid = styled.div `
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    align-items: center;
    justify-items: center;
    margin: 24px auto;

    @media (max-width: 600px) {
        display: block;
    }
`

export const GridItem = styled.img `
    width: 100%;
    min-height: 300px;
    padding: 8px;
    object-fit: cover;
`

export const WordsCloud = styled.span `
    padding: 8px;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 24px;
`