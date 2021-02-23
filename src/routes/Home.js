import React, { useState, useEffect } from 'react';
import { dbService } from '../fbase';

const Home = () => {
    const [tweet, setTweet] = useState("");
    const [tweets, setTweets] = useState([]);

    const getTweets = async() => {
        const dbTweets = await dbService.collection('tweets').get();
        dbTweets.forEach((document) => {
            const tweetObj = {
                id: document.id,
                ...document.data(),
            }
            setTweets((prev) => [tweetObj, ...prev])
        });
    }
    useEffect(() => {
        getTweets();
    }, [])

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("tweets").add({
            tweet,
            createdAt: Date.now(),
        });
        setTweet("");
    };
    const onChange = (event) => {
        const { target: { value } } = event;
        setTweet(value);
    }

    console.log(tweets);
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
                            <h4>{tweet.tweet}</h4>
                        </div>
                    )
                })}
            </div>
        </div>
    )
};

export default Home;