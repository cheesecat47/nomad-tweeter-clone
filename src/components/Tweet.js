import React from 'react';

const Tweet = ({ tweetObj, isOwner }) => {
    return (
        <div>
            <h4>{tweetObj.text}</h4>
            {isOwner && (
                <>
                    <button>Delete</button>
                    <button>Edit</button>
                </>
            )}
        </div>
    )
}

export default Tweet;