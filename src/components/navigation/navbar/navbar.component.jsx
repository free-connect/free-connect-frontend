import React from 'react';
import { withRouter } from 'react-router-dom';
import { LinkStyled } from '../link-styled/link-styled.component';
import { CustomButton } from '../../custom-button/custom-button.component';
import Login from '../../login/login.component';
import './navbar.styles.css'

const NavBar = (props) => {
    const [auth, setAuth] = React.useState(false);
    const [active, setActive] = React.useState(false);
    const [logActive, setLogActive] = React.useState(false);

    const handleLogout = (e) => {
        e.preventDefault()
        props.logout();
        props.history.push('/')
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
                        <div style={{ paddingTop: '-55px' }}>
                            <CustomButton handleClick={handleLogout} text='Logout' logout="true" />
                        </div>
                    </React.Fragment> :
                    <React.Fragment>
                        <LinkStyled loc='/' name='Home' />
                        <LinkStyled loc='/resources' name='Resources' />
                        <LinkStyled loc='/about' name="About" />
                        <p
                            onClick={() => setLogActive(!logActive)}
                            className={logActive ? 'nav-login active' : 'nav-login'}
                            >Login</p>
                            <React.Fragment>
                                <Login {...props} active={logActive}/>
                            </React.Fragment>
                    </React.Fragment>
                }
            </div>
        </React.Fragment>
    )
}

export default withRouter(NavBar)