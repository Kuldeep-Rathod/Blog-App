import React from 'react'

function Register() {
    return (
        <div className="auth">
            <h1>Register</h1>
            <form action="">
                <input required type="text" placeholder='Username'/>
                <input required type="email" placeholder='Email'/>
                <input required type="password" placeholder='Password'/>
                <button>Register</button>
                <span>
                    Do you have an account? <Link to="/login">Login</Link>
                </span>
            </form>
        </div>
    )
}

export default Register
