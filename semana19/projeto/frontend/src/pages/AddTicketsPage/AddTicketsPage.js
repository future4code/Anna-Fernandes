import React from 'react';
import { AddTicket } from '../../components/AddTicket/AddTicket';

import { Container } from '@material-ui/core';
import { MainContainer } from '../../styles/mainStyles';

const AddTicketsPage = () => {
    return (
        <MainContainer>
            <Container maxWidth="sm">
                <AddTicket />
            </Container>
        </MainContainer>
    )
}

export default AddTicketsPage;