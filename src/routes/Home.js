import { dbService } from '../fbase';
import React, { useState, useEffect } from 'react';
import Tweet from '../components/Tweet';
import TweetFactory from '../components/TweetFactory';

const Home = ({ userObj }) => {
    const [tweets, setTweets] = useState([]);

    useEffect(() => {
        const listener = dbService.collection('tweets')
            .orderBy('createdAt', 'desc')
            .onSnapshot(snapshot => {
                const tweetArray = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setTweets(tweetArray);
            })
        return () => listener();
    }, []);

    return (
        <div>
            <TweetFactory userObj={userObj} />
            <div>
                {tweets.map(tweet => {
                    return (
                        <Tweet key={tweet.id} tweetObj={tweet}
                            isOwner={tweet.creatorId === userObj.uid} />
                    )
                })}
            </div>
        </div>
    )
};

export default Home;