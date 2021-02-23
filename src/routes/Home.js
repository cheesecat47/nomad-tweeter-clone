import React, { useState, useEffect } from 'react';
import { dbService } from '../fbase';

const Home = ({ userObj }) => {
    const [tweet, setTweet] = useState("");
    const [tweets, setTweets] = useState([]);

    useEffect(() => {
        const listener = dbService.collection('tweets').onSnapshot(snapshot => {
            const tweetArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTweets(tweetArray);
        })
        return () => listener();
    }, [])

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("tweets").add({
            text: tweet,
            creatorId: userObj.uid,
            createdAt: Date.now(),
        });
        setTweet("");
    };
    const onChange = (event) => {
        const { target: { value } } = event;
        setTweet(value);
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={tweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength="{120}" />
                <input type="submit" value="tweet" />
            </form>
            <div>
                {tweets.map(tweet => {
                    return (
                        <div key={tweet.id}>
                            <h4>{tweet.text}</h4>
                        </div>
                    )
                })}
            </div>
        </div>
    )
};

export default Home;