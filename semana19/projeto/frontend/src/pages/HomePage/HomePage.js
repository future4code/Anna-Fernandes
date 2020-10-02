import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Container from '@material-ui/core/Container';
import { CenterObjects, MainContainer } from '../../styles/mainStyles';

const Homepage = () => {
    const [ events, SetEvents] = useState([]);

    const getEventInfo = async() => {
      try {
        const eventId = "lama-event-001";
        const data = await axios.get(`http://localhost:3001/event/${eventId}`)
        
        console.log(data.data)
        
        SetEvents(data.data)
  
      } catch(err) {
        console.log(err.message)
      }
    }
  
    useEffect(() => {
        getEventInfo();
    }, [])
  
    return (
      <MainContainer>
        <CenterObjects>
            <Container maxWidth="sm">
            <h1>Lama</h1>
            {events && events.map( event => {
                return <div>
                    <p>{event.day}</p>
                    <p>{event.description}</p>
                </div>
            })}
            <h2>Shows</h2>
            <h2>Bands participantes</h2>
            <h2>Ingressos</h2>
            </Container>
        </CenterObjects>
      </MainContainer>
    )
}

export default Homepage;