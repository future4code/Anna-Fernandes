import styled, {keyframes} from 'styled-components';

export const ProfileContainer = styled.div `
    width: 320px;
    height: calc(100% - 40px);
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    transition: all 0.3 ease-in-out;
`

export const ProfileImg = styled.img `
    display: block;
    width: 90%;
    height: calc(100% - 224px);
    margin: 16px auto;
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
    width: 100%;
    height: 100%;
    padding: 0;
    border-radius: 8px;
    position: relative;
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

export const ProfileBackground = styled.div `
  width: 100%;
  height: 100%;
  background-image: ${props => props.profileImage};
  background-size: cover;
  background-position: center center;
  filter: brightness(0.3);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
`

export const ProfileText = styled.div `
    width: 288px;
    height: 240px;
    padding: 16px;
    border-radius: 8px;
    background-color: #fff;
`

export const ProfileName = styled.h3 `
    padding: 0;
    margin: 0 0 8px 0;
`

export const ProfileBio = styled.p `
    padding: 0;
    margin: 0;
`

export const Message = styled.p `
    text-align: center;
    color: #fff;
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
    background: #fff;
    animation: ${ldsHeart} 1.2s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
    &:after,
    &:before {
        content: " ";
        position: absolute;
        display: block;
        width: 32px;
        height: 32px;
        background: #fff;
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