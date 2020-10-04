import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { baseUrl } from '../../variables/mainVariables';
import useProtectedRoute from '../../hooks/useProtectedRoute';

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
    const token = useProtectedRoute();

    const axiosConfig = {
        headers: {
            Authorization: token
        }
    }

    const getEventInfo = async() => {
      try {
        const data = await axios.get(`${baseUrl}/event/ticket/all`)
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

    const buyTicket = async(ticket_id) => {
        const body = {
            "ticket_id": ticket_id,
            "ticket_quantity": 1
        }

        try {
            await axios.get(`${baseUrl}/event/buy`, body, axiosConfig)
            setRequestMessage("Ingressos comprados com sucesso")
    
        } catch(err) {
            setRequestMessage(err.message)
        }
    }

    const [ requestMessage, setRequestMessage ] = useState("");

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
                                            
                                            <Button variant="contained" color="primary" onClick={() => buyTicket(ticket.id)}>comprar</Button>
                                            {requestMessage !== "" && <h2>{ requestMessage}</h2>}
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