import React from 'react';
import { AddPhoto } from '../../components/AddPhoto/AddPhoto';

import { Container } from '@material-ui/core';
import { MainContainer } from '../../styles/mainStyles';

const AddPhotosPage = () => {
    return (
        <MainContainer>
            <Container maxWidth="sm">
                <AddPhoto />
            </Container>
        </MainContainer>
    )
}

export default AddPhotosPage;