import React, { useState, useEffect } from 'react';
import { dbService, storageService } from '../fbase';
import Tweet from '../components/Tweet'
import { v4 as uuidv4 } from 'uuid';

const Home = ({ userObj }) => {
    const [tweet, setTweet] = useState("");
    const [tweets, setTweets] = useState([]);
    const [attachment, setAttachment] = useState();

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
        const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
        const response = await fileRef.putString(attachment, "data_url");
        console.log(response);
        // await dbService.collection("tweets").add({
        //     text: tweet,
        //     creatorId: userObj.uid,
        //     createdAt: Date.now(),
        // });
        // setTweet("");
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
            const { currentTarget: { result } } = finishedEvent;
            setAttachment(result);
        }
        reader.readAsDataURL(picture);
    }

    const onClearAttachment = () => setAttachment(null);

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={tweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength="{120}" />
                <input type="file" accept="image/*" onChange={onFileChange} />
                <input type="submit" value="tweet" />
                {attachment && (
                    <div>
                        <img src={attachment} width="50px" height="50px" />
                        <button onClick={onClearAttachment}>Clear</button>
                    </div>
                )}
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