import React, { useEffect } from 'react';
import { authService, dbService } from '../fbase';

const Profile = ({ userObj }) => {
    const onLogOutClick = () => {
        authService.signOut()
    };

    const getMyTweets = async () => {
        const tweets = await dbService.collection("tweets")
            .where("creatorId", "==", userObj.uid)
            .orderBy("createdAt", "desc")
            .get();
        console.log(tweets.docs.map(doc => doc.data()));
    }
    useEffect(() => {
        getMyTweets();
    }, [])

    return (
        <>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    )
};

export default Profile;