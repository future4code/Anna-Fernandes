import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, CardActions, CardContent, Container, Typography } from '@material-ui/core';
import { CenterObjects, MainContainer } from '../../styles/mainStyles';

const useStyles = makeStyles({
    pos: {
      marginBottom: 16,
    },
  });

const TicketsPage = () => {
    const classes = useStyles();
    const [ tickets, SetTickets] = useState([]);

    const getEventInfo = async() => {
      try {
        const data = await axios.get(`http://localhost:3001/event/ticket/all`)
        SetTickets(data.data)
  
      } catch(err) {
        console.log(err.message)
      }
    }
  
    useEffect(() => {
        getEventInfo();
    }, [])

    let days = [];
    let daysWithoutDuplicate = [];

    if(tickets) {
        tickets.map( ticket => {
            days.push(ticket.data)
        })
        daysWithoutDuplicate = days.filter( (day, idx) =>{
            return days.indexOf(day) === idx
        })
    }


    return (
        <MainContainer>
            <Container maxWidth="sm">
                <CenterObjects>
                    <h1>Ingressos à venda</h1>
                    {daysWithoutDuplicate.length !== 0 && daysWithoutDuplicate.map( day => {
                        return <>
                            <h2>{day}</h2>
                            {tickets && tickets.map( ticket => {
                                if(day === ticket.data) {
                                    return <Card className={classes.pos}>
                                        <CardContent>
                                            <Typography component="h3" color="primary" gutterBottom>{ticket.ticket_name}</Typography>
                                            <Typography color="textSecondary" >Preço: {ticket.ticket_price}</Typography>
                                            <Typography  className={classes.pos}>Quantidade disponível: {ticket.ticket_quantity - ticket.ticket_sold}</Typography>
                                            
                                            <Button variant="contained" color="primary">comprar</Button>
                                        </CardContent>
                                    </Card>
                                }
                            })}
                        </>
                    })}
                </CenterObjects>
            </Container>
        </MainContainer>
    )
}

export default TicketsPage;