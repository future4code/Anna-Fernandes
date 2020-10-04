import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Container from '@material-ui/core/Container';
import { CenterObjects, MainContainer, Grid, GridItem, WordsCloud } from '../../styles/mainStyles';

const Homepage = () => {
    const [ events, SetEvents] = useState([]);

    const getEventInfo = async() => {
      try {
        const data = await axios.get(`http://localhost:3001/event/all`)
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
            <Container maxWidth="lg">
            <h1>Lama</h1>
            {events && events.map( event => {
                return <div>
                    <h2>{event.day}</h2>
                    <h3>{event.data}</h3>
                    <h3>{event.description}</h3>
                    <div>
                      {event.shows.length !== 0 &&event.shows.map( show => {
                        return <WordsCloud>{show.name}</WordsCloud>
                      })}
                    </div>
                    <div>
                      <Grid>
                        {event.gallery.length !== 0 && event.gallery.map((item, idx) => (
                          <GridItem key={idx} src={item.photo} alt="Imagem do evento"/>
                        ))}
                      </Grid>
                    </div>
                </div>
            })}
            </Container>
        </CenterObjects>
      </MainContainer>
    )
}

export default Homepage;