import React, { useState, useEffect } from 'react';
import axios from 'axios';

import IconsMatch from '../IconsMatch/IconsMatch';
import { ProfileContainer } from './styles';

const baseUrl = "https://us-central1-missao-newton.cloudfunctions.net/astroMatch"

const path = "anna-fernandes"

function Profiles() {

    const [profile, setProfile] = useState({})

    useEffect(() => {
        getProfile();
    }, [])

    const getProfile = async () => {
        const response = await axios.get(`${baseUrl}/${path}/person`)
        setProfile(response.data.profile)
    }
    
    return (
    <ProfileContainer>
        <h2>Perfis candidatos</h2>
        <div key={profile.id}>
            <img src={profile.photo} alt={profile.name} />
            <h4>{profile.name}, {profile.age}</h4>
            <p>{profile.bio}</p>
            <IconsMatch id={profile.id} getProfile={getProfile} />
        </div>
    </ProfileContainer>
  );
}

export default Profiles;
