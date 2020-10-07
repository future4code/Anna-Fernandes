import React from 'react';
import { Login } from '../../components/Login/Login';

import { Container } from '@material-ui/core';
import { MainContainer } from '../../styles/mainStyles';

const LoginPage = () => {
    return (
        <MainContainer>
            <Container maxWidth="sm">
                <Login />
            </Container>
        </MainContainer>
    )
}

export default LoginPage;