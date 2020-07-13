import React from 'react';
import axios from 'axios';

const baseUrl = "https://us-central1-missao-newton.cloudfunctions.net/astroMatch"


const axiosConfig = {
    headers: {
        'Content-Type': 'application/json'
    }
};

const path = "anna-fernandes"

function Reset() {

    const clear = async () => {
        await axios.put(`${baseUrl}/${path}/clear`, axiosConfig)
    }
    
  return (
    <div className="App">
        <button onClick={clear}>Limpar swipes e matches</button>
    </div>
  );
}

export default Reset;
