import { authService } from '../fbase';
import React, { useState } from 'react';

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(false);
    const [error, setError] = useState("");

    const onChange = (event) => {
        const { target: { name, value } } = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;
            if (newAccount) {
                data = await authService.createUserWithEmailAndPassword(email, password);
            } else {
                data = await authService.signInWithEmailAndPassword(email, password);
            }
            console.log(data);
        } catch (error) {
            setError(error.message);
        }
    }

    const toggleAccount = () => {
        setNewAccount((prev) => !prev);
    }

    return (
        <>
            <form onSubmit={onSubmit}
                className="container">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={onChange}
                    className="authInput"
                    required />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={onChange}
                    className="authInput"
                    required />
                <input
                    type="submit"
                    className="authInput authSubmit"
                    value={newAccount ? "Create Account" : "Sign In"} />
                {error && <span className="authError">{error}</span>}
            </form>
            <span onClick={toggleAccount}
                className="authSwitch">
                {newAccount ? "Sign In" : "Create Account"}
            </span>
        </>
    )
};

export default AuthForm;