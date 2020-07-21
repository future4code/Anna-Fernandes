import React, { useEffect } from 'react';
import axios from 'axios';

import matchIcon from '../../images/match.svg';
import notMatchIcon from '../../images/not_match.svg';

import { IconsContainer, Icon } from './styles';

const baseUrl = "https://us-central1-missao-newton.cloudfunctions.net/astroMatch"

const path = "anna-fernandes"

function IconsMatch(props) {


    useEffect(() => {
        document.addEventListener("keydown", onKeyPressed);
        return () => {
            document.removeEventListener('keydown', onKeyPressed) 
        }
    }, []);

    const isMatch = async profileid => {
        const body = {
            id: profileid,
            choice: true
        }

        const response = await axios.post(`${baseUrl}/${path}/choose-person`, body);
        
        props.animation("right");
        props.getProfile();
    }

    const isNotMatch = async profileid => {
        const body = {
            id: profileid,
            choice: false
        }

        const response = await axios.post(`${baseUrl}/${path}/choose-person`, body);
        props.animation("left");
        props.getProfile();
    }
  
    const onKeyPressed = event => {
        if( event.keyCode === 39 ) {
            isMatch(props.profileId);
        } else if( event.keyCode === 37 ) {
            isNotMatch(props.profileId);
        }
    }
    
    return (
    <IconsContainer>
            <Icon src={notMatchIcon} alt="Ícone de rejeitar" onClick={() => isNotMatch(props.profileId)}/>
            <Icon src={matchIcon} alt="Ícone de aceitar" onClick={()=>isMatch(props.profileId)}/>
    </IconsContainer>
  );
}

export default IconsMatch;
