import React from 'react';

import { Container } from '@material-ui/core';
import { CenterObjects, MainContainer } from '../../styles/mainStyles';

const TicketsPage = () => {
    return (
        <MainContainer>
            <Container maxWidth="sm">
                <CenterObjects>
                    <h1>Ingressos à venda</h1>
                </CenterObjects>
            </Container>
        </MainContainer>
    )
}

export default TicketsPage;