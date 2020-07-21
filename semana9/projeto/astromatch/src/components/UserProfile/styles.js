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
    position: relative;
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

export const EditBtn = styled.button `
    display: block;
    margin: 16px auto;
    width: 54px;
    border: none;
    background-color: transparent;
    cursor: pointer;
    transition: all 0.3 ease;
    &:focus {
        outline: none;
    }
    &:hover {
        opacity: 0.5;
    }
`

export const EditContainer = styled.div `
    display: block;
    width: 288px;
    height: calc(100% - 32px);
    margin: auto;
    padding: 16px;
    background-color: #fff;
    border-radius: 8px;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 0px 2px  rgba(0, 0, 0, 0.25);
`

export const InputEdit = styled.input `
    min-width: 204px;
    margin: 8px auto;
    padding: 8px;
    border: none;
    border-radius: 8px;
    box-shadow: 0px 0px 2px  rgba(0, 0, 0, 0.25);
`

export const TextAreaEdit = styled.textarea `
    min-width: 204px;
    min-height: 160px;
    margin: 8px auto;
    padding: 8px;
    border: none;
    border-radius: 8px;
    box-shadow: 0px 0px 2px  rgba(0, 0, 0, 0.25);
`
export const SaveBtn = styled.button `

    display: block;
    margin: 16px auto;
    padding: 8px;
    width: 80px;
    border-radius: 8px;
    border: none;
    font-weight: 700;
    color: #fff;
    background-color: #6f6ade;
    cursor: pointer;
    transition: all 0.3 ease;
    &:focus {
        outline: none;
    }
    &:hover {
        opacity: 0.5;
    }
`
export const CloseBtn = styled.button `
    border: none;
    position: absolute;
    right: 16px;
    top: 16px;
    font-size: 1.5rem;
    font-weight: 700;
    color: #6f6ade;
    background-color: transparent;
    cursor: pointer;
    transition: all 0.3 ease;
    &:focus {
        outline: none;
    }
    &:hover {
        opacity: 0.5;
    }
`
