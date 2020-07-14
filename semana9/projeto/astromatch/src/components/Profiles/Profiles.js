import React, { useState, useEffect } from 'react';
import axios from 'axios';

import IconsMatch from '../IconsMatch/IconsMatch';
import { ProfileContainer, LoadingContainer, LoadingBox, Loading, Message, ProfileImg, ProfileContent, ProfileText } from './styles';

const baseUrl = "https://us-central1-missao-newton.cloudfunctions.net/astroMatch"

const path = "anna-fernandes"

function Profiles(props) {

    const [profile, setProfile] = useState({})
    const [animate, setAnimation] = useState("none")
 
    const getProfile = async () => {
        const response = await axios.get(`${baseUrl}/${path}/person`)
        setProfile(response.data.profile);
    }

    const animation = side => {
        if (side === "right") {
            setAnimation("right");
        } else if (side === "left") {
            setAnimation("left");
        } else {
            setAnimation("none");
        }
    }

    useEffect(() => {
        getProfile();
        animation("none");
    }, [props.currentPage, props.updateAfterClear]);

    return (
    <ProfileContainer>
        {profile && !profile.name && <LoadingContainer><LoadingBox><Loading></Loading></LoadingBox></LoadingContainer>}

        {profile && profile.name && <div key={profile.id}>
            <ProfileContent animate={animate}>
                <ProfileImg src={profile.photo} alt={profile.name} />
                <ProfileText>
                    <h3>{profile.name}, {profile.age}</h3>
                    <p>{profile.bio}</p>
                </ProfileText>
            </ProfileContent>
            <IconsMatch id={profile.id} getProfile={getProfile} animation={animation}/>
        </div>}

        { !profile && <Message>Não há mais candidatos. Tente limpar seus matches e swipes e começar de novo.</Message>}
    </ProfileContainer>
  );
}

export default Profiles;
