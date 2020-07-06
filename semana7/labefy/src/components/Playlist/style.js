
import styled from 'styled-components';

export const PlaylistContainer = styled.div `
    padding: 24px;
`

export const PlaylistImg = styled.img `
    width: 100%;
    max-height: 240px;
    margin: 24px 0;
    object-fit: cover;
`

export const PlaylistTitle = styled.h1 `
    margin: 40px 0 16px 0;
`

export const PlaylistTracks = styled.div `
    padding: 16px 0;
    margin: 16px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &:hover {
        background-color: #3F0059;
    }
`

export const PlaylistTrackDetails = styled.div `
    display: flex;
    align-items: flex-start;
    justify-content: center;
`

export const TrackText = styled.div `
    margin: 0 16px;
`

export const Name = styled.h3 `
    margin-bottom: 8px;
`

export const Artist = styled.h4 `
    font-weight: 400;
`

export const AddTrack = styled.div `
    margin: 24px 0;
    padding: 24px;
    display: flex;
    flex-wrap: wrap;
    background-color: #3F0059;
`
export const AddTrackTitle = styled.h4 `
    width: 100%;
    margin-bottom: 16px;
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