import React from 'react';
import { AddShow } from '../../components/AddShow/AddShow';

import { Container } from '@material-ui/core';
import { MainContainer } from '../../styles/mainStyles';

const AddShowPage = () => {
    return (
        <MainContainer>
            <Container maxWidth="sm">
                <AddShow />
            </Container>
        </MainContainer>
    )
}

export default AddShowPage;