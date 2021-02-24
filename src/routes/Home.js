import React, { useState, useEffect } from 'react';
import { dbService } from '../fbase';
import Tweet from '../components/Tweet'

const Home = ({ userObj }) => {
    const [tweet, setTweet] = useState("");
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
    const onFileChange = (event) => {
        const { target: { files } } = event;
        const picture = files[0];

        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            console.log(finishedEvent);
        }
        reader.readAsDataURL(picture);

    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={tweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength="{120}" />
                <input type="file" accept="image/*" onChange={onFileChange} />
                <input type="submit" value="tweet" />
            </form>
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