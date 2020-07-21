import styled, {keyframes} from 'styled-components';

export const MatchesContainer = styled.ul `
    height: 100%;
    list-style: none;
    margin: 0;
    padding: 16px;
    background-color: #fff;
    overflow-y: scroll;
`

export const Match = styled.li `
    display: flex;
    align-items: center;
    justify-content: flex-start;

    &:nth-child(even){
        background-color: #f5f5f5;
    }
`

export const MatchImg = styled.img `
    width: 40px;
    height: 40px;
    margin-right: 16px;
    border-radius: 50%;
    object-fit: cover;
`

export const LoadingContainer = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 60vh;
`

export const LoadingBox = styled.div `
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
    transform: rotate(45deg);
    transform-origin: 40px 40px;
`

const ldsHeart = keyframes`
    0% {
      transform: scale(0.95);
    }
    5% {
      transform: scale(1.1);
    }
    39% {
      transform: scale(0.85);
    }
    45% {
      transform: scale(1);
    }
    60% {
      transform: scale(0.95);
    }
    100% {
      transform: scale(0.9);
    }
`

export const Loading = styled.div `
    top: 32px;
    left: 32px;
    position: absolute;
    width: 32px;
    height: 32px;
    background: #D90B31;
    animation: ${ldsHeart} 1.2s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
    &:after,
    &:before {
        content: " ";
        position: absolute;
        display: block;
        width: 32px;
        height: 32px;
        background: #D90B31;
    }
    &:before {
        left: -24px;
        border-radius: 50% 0 0 50%;
    }
    &:after {
        top: -24px;
        border-radius: 50% 50% 0 0;
    }
`