import React from 'react';
import { Signup } from '../../components/Signup/Signup';

import { Container } from '@material-ui/core';
import { MainContainer } from '../../styles/mainStyles';

const SignupPage = () => {
    return (
        <MainContainer>
            <Container maxWidth="sm">
                <Signup />
            </Container>
        </MainContainer>
    )
}

export default SignupPage;