import React from 'react'
import { Link } from 'react-router-dom';


function Login() {
    return (
        <div className="auth">
            <h1>Login</h1>
            <form action="">
                <input required type="text" placeholder='Username'/>
                <input required type="email" placeholder='Email'/>
                <input required type="password" placeholder='Password'/>
                <button>Login</button>
                <span>
                    Don't have an account? <Link to="/register">Register</Link>
                </span>
            </form>
        </div>
    )
}

export default Login
