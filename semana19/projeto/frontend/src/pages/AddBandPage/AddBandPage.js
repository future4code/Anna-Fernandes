import React from 'react';
import { AddBand } from '../../components/AddBand/AddBand';

import { Container } from '@material-ui/core';
import { MainContainer } from '../../styles/mainStyles';

const AddBandPage = () => {
    return (
        <MainContainer>
            <Container maxWidth="sm">
                <AddBand />
            </Container>
        </MainContainer>
    )
}

export default AddBandPage;