import React from 'react';

import { Container } from '@material-ui/core';
import { CenterObjects, MainContainer } from '../../styles/mainStyles';

const ProfilePage = () => {
    return (
        <MainContainer>
            <Container maxWidth="sm">
                <CenterObjects>
                    <h1>Perfil</h1>
                    <h1>Seus ingressos</h1>
                </CenterObjects>
            </Container>
        </MainContainer>
    )
}

export default ProfilePage;