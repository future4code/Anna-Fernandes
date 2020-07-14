import React from 'react';
import axios from 'axios';

import { ResetBtn } from './styles';

const baseUrl = "https://us-central1-missao-newton.cloudfunctions.net/astroMatch"


const axiosConfig = {
    headers: {
        'Content-Type': 'application/json'
    }
};

const path = "anna-fernandes"

function Reset() {

    const clear = async () => {
        if(window.confirm('Você tem certeza de que deseja limpar seus matches?')) {
            await axios.put(`${baseUrl}/${path}/clear`, axiosConfig)
        }
    }
    
  return (
    <ResetBtn onClick={clear}>Limpar swipes e matches</ResetBtn>
  );
}

export default Reset;
