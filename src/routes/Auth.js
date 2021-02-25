import { authService, fbinstance } from '../fbase';
import { faTwitter, faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthForm from '../components/AuthForm';
import React from 'react';

const Auth = () => {
    const onSocialClick = async (event) => {
        const { target: { name } } = event;

        let provider;
        if (name === "google") {
            provider = new fbinstance.auth.GoogleAuthProvider();
        } else if (name === "github") {
            provider = new fbinstance.auth.GithubAuthProvider();
        }

        await authService.signInWithPopup(provider);
    }

    return (
        <div className="authContainer">
            <FontAwesomeIcon icon={faTwitter}
                color={"#04AAFF"}
                size="3x"
                style={{ marginBottom: 30 }} />

            <AuthForm />

            <div className="authBtns">
                <button
                    name="google"
                    className="authBtn"
                    onClick={onSocialClick}>
                    <FontAwesomeIcon icon={faGoogle} /> Continue with Google
                </button>
                <button
                    name="github"
                    className="authBtn"
                    onClick={onSocialClick}>
                    <FontAwesomeIcon icon={faGithub} /> Continue with GitHub
                </button>
            </div>
        </div>)
};

export default Auth;