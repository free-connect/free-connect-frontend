import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const NavBar = (props) => {
    const handleSubmitLogout = (e) => {
        e.preventDefault()
        const data = {
            logout: true
        }
        fetch('/logout', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                }
            })
            .then(res => res.json())
            .then(response => {
                if (response.msg) {
                    console.log('success message', response.msg, props)
                    alert('logged out!');
                    props.history.push('/login')
                }
            })
            .catch(err => console.log(err))
    }

    return(
        <div className='nav-bar'>
            <Link to='/'>Home</Link>
            <br />
            <Link to='/resources'>Resources</Link>
            <br />
            <Link to='/about'>About</Link>
            <br />
            <Link to='/admin-resources'>Admin Resources</Link>
            <br />
            <Link to='/login'>Login</Link>
            <br />
            <form method="POST" onSubmit={handleSubmitLogout}>
                <button type="submit">Logout</button>
            </form>
            <br />
            <Link to='/register'>Register</Link>
        </div>
    )
}

export default withRouter(NavBar)