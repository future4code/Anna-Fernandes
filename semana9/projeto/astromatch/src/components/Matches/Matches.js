import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { MatchesContainer, Match, MatchImg } from './styles';


const baseUrl = "https://us-central1-missao-newton.cloudfunctions.net/astroMatch"

const path = "anna-fernandes"

function Matches(props) {
    const [matches, setMatches] = useState([])

    const getMatches = async () => {
        const response = await axios.get(`${baseUrl}/${path}/matches`)
        setMatches(response.data.matches)
    }

    useEffect(() => {
        getMatches();
    }, [props.currentPage])

  return (
    <MatchesContainer> 
            {matches.length !== 0 ? matches.map( match => {
                return (
                    <Match key={match.id}>
                        <MatchImg src={match.photo} />
                        <p>{match.name}</p>
                    </Match>
                )
            }) : <p>loading...</p>}
    </MatchesContainer>
  );
}

export default Matches;
