import styled, {keyframes} from 'styled-components';

export const ProfileContainer = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: calc(100% - 40px);
    transition: all 0.3 ease-in-out;
`

export const ProfileImg = styled.img `
    width: 100%;
    height: 100%;
    border-radius: 8px;
    object-fit: cover;
    object-position: top center;
`

const slideOutLeft = keyframes `
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(-1000px);
    opacity: 0;
  }
`

const slideUp = keyframes `
   0% {
    transform: translateY(900px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
`

const slideOutRight = keyframes `
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(1000px);
    opacity: 0;
  }
`

export const ProfileContent = styled.div `
    margin-bottom: 16px;
    height: 60vh;
    width: 100%;
    border-radius: 8px;
    position: relative;
    text-shadow: 0px 0px 2px rgba(0, 0, 0, 1);
    transition: all 0.3 ease-in-out;
    animation: ${ props => {
        if(props.animate === "right"){
            return slideOutRight
        } else if(props.animate === "left"){
            return slideOutLeft
        } else {
            return slideUp
        }
    }} 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both ;
    ;
`

export const ProfileText = styled.div `
    color: #fff;
    position: absolute;
    bottom: 8px;
    left: 8px;
    z-index: 2;
`

export const Message = styled.p `
    text-align: center;
    color: #D90B31;
    font-weight: 700;
    padding: 0 16px;
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
    background: #04BFAD;
    animation: ${ldsHeart} 1.2s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
    &:after,
    &:before {
        content: " ";
        position: absolute;
        display: block;
        width: 32px;
        height: 32px;
        background: #04BFAD;
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