import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import { Container } from '@material-ui/core';
import { CenterObjects, MainContainer } from '../../styles/mainStyles';

const ProfilePage = () => {
    const [ profile, SetProfile] = useState([]);
    const history = useHistory();

    const getProfileInfo = async() => {
      try {
        const axiosConfig = {
            headers: {
                Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFjMjlkMjU4LWQxYzktNDBhZC1hNmE0LTA5ZjZiMjY1OWI5NSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTYwMTc3NzIzNSwiZXhwIjoxNjAxNzk1MjM1fQ.f_3YhScjtfuwNGcV8JyFYfBhLQtclfSRT8SrSBpIlLw"
            }
        } 

        const data = await axios.get(`http://localhost:3001/user/profile`, axiosConfig)
        
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
                </CenterObjects>
            </Container>
        </MainContainer>
    )
}

export default ProfilePage;