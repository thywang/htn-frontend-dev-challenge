import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

export default function Login({ isAuthed, setIsAuthed }) {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // hard coded correct username password combination
    const correctUsername = "htn";
    const correctPassword = "2023";

    const handleSubmit = (e) => {
        e.preventDefault();
        // check login information if is correct
        if (username === correctUsername && password === correctPassword) {
            console.log("Correct login!");
            setIsAuthed(true);
        } else {
            alert("Incorrect login. Try again.");
        }
    };

    useEffect(() => {
        if (isAuthed) navigate("/");
    }, [navigate, isAuthed]);

    return (
        <div className="page">
            <Link to='/'><button id="go-back-button">Go back to events</button></Link>
            <div className="login">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">username</label>
                    <input value={username} required onChange={(e) => setUsername(e.target.value)} type="username" placeholder="Username" id="username" name="username"></input>
                    <label htmlFor="password" value={password}>password</label>
                    <input value={password} required onChange={(e) => setPassword(e.target.value)} type={showPassword ? "text" : "password"} placeholder="******" id="password" name="password"></input>
                    <span className="show-toggle"><input type="checkbox" onClick={() => setShowPassword(!showPassword)}></input> Show password</span>
                    <button type="submit">Log In</button>
                </form>
            </div>
        </div>
    );
}
