import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { server } from '../main';
import { AuthContext } from '../context/authContext.jsx';


function Login() {

    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    })
    const [err, setError] = useState(null)

    const navigate = useNavigate();

    const { login } = useContext(AuthContext);

    // console.log(currentUser)

    const handleChange = e => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
    };

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            await login(inputs)
            navigate("/");
        }
        catch (err) {
            setError(err.response.data.error);
        }
    };

    return (
        <div className="auth">
            <h1>Login</h1>
            <form action="">
                <input required type="text" placeholder='Username' name='username' onChange={handleChange}/>
                <input required type="password" placeholder='Password' name='password' onChange={handleChange}/>
                <button onClick={handleSubmit}>Login</button>
                {err && <p>{err}</p>}
                <span>
                    Don't have an account? <Link to="/register">Register</Link>
                </span>
            </form>
        </div>
    )
}

export default Login
