import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import useProtectedRoute from '../../hooks/useProtectedRoute';
import { baseUrl } from '../../variables/mainVariables';

import { makeStyles } from '@material-ui/core/styles';
import { Container, Card, CardContent, Typography } from '@material-ui/core';
import { CenterObjects, MainContainer } from '../../styles/mainStyles';

const useStyles = makeStyles({
    pos: {
      marginBottom: 16,
    },
  });

const ProfilePage = () => {
    const classes = useStyles();
    const [ profile, SetProfile] = useState([]);
    const history = useHistory();
    const token = useProtectedRoute();

    const axiosConfig = {
        headers: {
            Authorization: token
        }
    }

    const getProfileInfo = async() => {
      try {

        const data = await axios.get(`${baseUrl}/user/profile`, axiosConfig)
        
        SetProfile(data.data.result)
  
      } catch(err) {
        console.log(err.message)
      }
    }
  
    useEffect(() => {
        getProfileInfo();
    }, [history])

    return (
        <MainContainer>
            <Container maxWidth="sm">
                <CenterObjects>
                    <h1>Perfil</h1>
                    <p>{profile.name}</p>
                    <p>{profile.email}</p>
                    <p>{profile.role}</p>
                    <h1>Seus ingressos</h1>
                    {profile.tickets && profile.tickets.length !== 0 && profile.tickets.map( ticket => {
                        return <Card className={classes.pos}>
                            <CardContent>
                                <Typography component="h3" color="primary" gutterBottom>{ticket.ticket_name}</Typography>
                                <Typography color="textSecondary" >Preço: {ticket.ticket_price}</Typography>
                                <Typography  className={classes.pos}>Quantidade: {ticket.ticket_quantity}</Typography>
                            </CardContent>
                        </Card>
                    }) }
                </CenterObjects>
            </Container>
        </MainContainer>
    )
}

export default ProfilePage;