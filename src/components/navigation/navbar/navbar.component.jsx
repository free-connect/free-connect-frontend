import React from 'react';
import { withRouter } from 'react-router-dom';
import { LinkStyled } from '../link-styled/link-styled.component'
import './navbar.styles.css'

const NavBar = (props) => {
    const [auth, setAuth] = React.useState(false);
    const [active, setActive] = React.useState(false);

    const handleLogout = (e) => {
        e.preventDefault()
        props.logout();
        props.history.push('/login')
    }

    React.useEffect(() => setAuth(props.isAuth), [])

    return (
        <React.Fragment>
            <div className='block' onClick={() => setActive(!active)}>
                <div className={!active ? "line" : 'line active'}></div>
                <div className={!active ? "line1" : 'line1 active'}></div>
            </div>
            <div className={!active ? 'nav-bar active' : 'nav-bar'}>
                {auth ?
                    <React.Fragment>
                        <LinkStyled loc='/' name='Home' />
                        <LinkStyled loc='/resources' name='Resources' />
                        <LinkStyled loc='/about' name='About' />
                        {props.admin ?
                            <React.Fragment>
                                <LinkStyled loc='/admin-resources' name='Admin Resources' />
                            </React.Fragment> :
                            null}
                        <LinkStyled loc='/profile' name='Profile' />
                        <form onSubmit={handleLogout}>
                            <button type="submit">Logout</button>
                        </form>
                    </React.Fragment> :
                    <React.Fragment>
                        <LinkStyled loc='/' name='Home' />
                        <LinkStyled loc='/resources' name='Resources' />
                        <LinkStyled loc='/about' name="About" />
                        <LinkStyled loc='/login' name='Login' />
                    </React.Fragment>
                }
            </div>
        </React.Fragment>
    )
}

export default withRouter(NavBar)