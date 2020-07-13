import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { MatchesContainer, Match, MatchImg } from './styles';


const baseUrl = "https://us-central1-missao-newton.cloudfunctions.net/astroMatch"

const path = "anna-fernandes"

function Matches() {
    const [matches, setMatches] = useState([])

    useEffect(() => {
        getMatches();
    }, [])

    const getMatches = async () => {
        const response = await axios.get(`${baseUrl}/${path}/matches`)
        setMatches(response.data.matches)
    }
  return (
    <MatchesContainer>
        <h2>Matches</h2>  
            {matches.length !== 0 && matches.map( match => {
                return (
                    <Match key={match.id}>
                        <MatchImg src={match.photo} />
                        <p>{match.name}</p>
                    </Match>
                )
            })}
    </MatchesContainer>
  );
}

export default Matches;
