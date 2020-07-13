import styled from 'styled-components';

export const SearchTracksContainer = styled.div `
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const Iconbtn = styled.button `
    background-color: transparent;
    box-shadow: none;
    float: right;
`

export const Icon = styled.img `
    width: 24px;
    height: 24px;
    object-fit: contain;
`

export const ResultsContainer = styled.div `
    padding: 24px;
`

export const TrackTitle = styled.h4 `
    margin: 16px 0 8px 0;
`

export const TrackResult = styled.div `
    padding: 8px;

    &:hover {
        background-color: #3F0059;
    }
`