import { authService, fbinstance } from '../fbase';
import React from 'react';
import AuthForm from '../components/AuthForm';

const Auth = () => {
    const onSocialClick = async (event) => {
        const { target: { name } } = event;

        let provider;
        if (name === "google") {
            provider = new fbinstance.auth.GoogleAuthProvider();
        } else if (name === "github") {
            provider = new fbinstance.auth.GithubAuthProvider();
        }

        const data = await authService.signInWithPopup(provider);
        console.log(data);
    }

    return (
        <div>
            <AuthForm />

            <div>
                <button name="google" onClick={onSocialClick}>Continue with Google</button>
                <button name="github" onClick={onSocialClick}>Continue with GitHub</button>
            </div>
        </div>)
};

export default Auth;