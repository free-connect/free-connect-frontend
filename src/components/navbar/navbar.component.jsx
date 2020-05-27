import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const NavBar = (props) => {
    const [auth, setAuth] = React.useState(false)

    const handleLogout = (e) => {
        e.preventDefault()
        props.logout();
        props.history.push('/login')
    }

    React.useEffect(() => setAuth(props.isAuth), [])

    return(
        <div className='nav-bar'>
            {auth ? 
            <React.Fragment>
                <Link to='/'>Home</Link>
                <br />
                <Link to='/resources'>Resources</Link>
                <br />
                <Link to='/about'>About</Link>
                <br />
                {props.admin ? 
                <React.Fragment>
                    <Link to='/admin-resources'>Admin Resources</Link>
                    <br />
                </React.Fragment> : 
                null}
                <Link to='/profile'>Profile</Link>
                <br />
                <form onSubmit={handleLogout}>
                    <button type="submit">Logout</button>
                </form>
                <br />
            </React.Fragment> :
            <React.Fragment>
                <Link to='/'>Home</Link>
                <br />
                <Link to='/resources'>Resources</Link>
                <br />
                <Link to='/about'>About</Link>
                <br />
                <Link to='/login'>Login</Link>
            </React.Fragment>
            }
        </div>
    )
}

export default withRouter(NavBar)