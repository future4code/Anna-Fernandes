import styled from 'styled-components';

export const PlaylistsContainer = styled.div `
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr 3fr;

    @media all and (max-width: 560px) {
        display: block;
    }
`

export const PlaylistListsContainer = styled.div `
    background-color: #3F0059;
    max-width: 100vw;
`

export const SearchPlaylistContainer = styled.div `
    padding: 16px;
    display: flex;
`
export const Results = styled.div `
`

export const ResultsPlaylist = styled.div `
    padding: 16px;
`
export const PlaylistOnPlaylists = styled.div `
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    cursor: pointer;
    &:hover {
        background-color: #500078;
        box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
    }
`

export const PlaylistTitle = styled.h2 `
    padding: 16px;
`

export const PlaylistName = styled.h4 `
    margin-right: 16px;
`

export const Playlists = styled.div `
    margin: 16px 0;
`

export const Icon = styled.img `
    width: 24px;
    height: 24px;
    object-fit: contain;
`

export const Iconbtn = styled.button `
    background-color: transparent;
    box-shadow: none;
`

export const Intro = styled.h1 `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
`

export const SearchTracksBtn = styled.button `
    display: block;
    margin: 24px auto;
    padding: 16px;
    width: calc(100% - 24px);
`