import React, { useState, useEffect } from 'react';
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

    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onChange = (event) => {
        const { target: { value}} = event;
        setNewDisplayName(value);
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({
                displayName: newDisplayName
            });
        };
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Display name" 
                    onChange={onChange} value={newDisplayName} />
                <input type="submit" value="Update Profile" />
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    )
};

export default Profile;