import React, { useState, useEffect } from 'react';
import axios from 'axios';

import IconsMatch from '../IconsMatch/IconsMatch';
import { ProfileContainer } from './styles';

const baseUrl = "https://us-central1-missao-newton.cloudfunctions.net/astroMatch"

const path = "anna-fernandes"

function Profiles(props) {

    const [profile, setProfile] = useState({})

    const getProfile = async () => {
        const response = await axios.get(`${baseUrl}/${path}/person`)
        setProfile(response.data.profile);
    }

    useEffect(() => {
        getProfile();
    }, [props.currentPage]);
    
    return (
    <ProfileContainer>
        {profile && !profile.name && <p>loading...</p>}
        {profile && profile.name && <div key={profile.id}>
            <img src={profile.photo} alt={profile.name} />
            <h4>{profile.name}, {profile.age}</h4>
            <p>{profile.bio}</p>
            <IconsMatch id={profile.id} getProfile={getProfile} />
        </div>}
        { !profile && <p>Não há mais candidatos. Tente limpar seus matches e swipes e começar de novo.</p>}
    </ProfileContainer>
  );
}

export default Profiles;
