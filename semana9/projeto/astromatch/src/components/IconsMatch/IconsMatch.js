import React, { useState, useEffect } from 'react';
import axios from 'axios';

import matchIcon from '../../images/match.svg';
import notMatchIcon from '../../images/not_match.svg';

import { IconsContainer, Icon } from './styles';

const baseUrl = "https://us-central1-missao-newton.cloudfunctions.net/astroMatch"

const axiosConfig = {
    headers: {
        'Content-Type': 'application/json'
    }
};

const path = "anna-fernandes"

function IconsMatch(props) {

    const isMatch = async profileid => {
        const body = {
            id: profileid,
            choice: true
        }

        const response = await axios.post(`${baseUrl}/${path}/choose-person`, body, axiosConfig);
        props.getProfile();
        console.log(body);
        console.log(response.data)
    }

    const isNotMatch = async profileid => {
        const body = {
            id: profileid,
            choice: false
        }

        const response = await axios.post(`${baseUrl}/${path}/choose-person`, body, axiosConfig );
        props.getProfile();
        console.log(body);
        console.log(response.data)
    }
    
    return (
    <IconsContainer>
            <Icon src={notMatchIcon} alt="Ícone de rejeitar" onClick={() => isNotMatch(props.id)} />
            <Icon src={matchIcon} alt="Ícone de aceitar" onClick={()=>isMatch(props.id)}/>
    </IconsContainer>
  );
}

export default IconsMatch;
