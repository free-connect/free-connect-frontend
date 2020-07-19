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
        setActive(false)
        setTimeout(() => props.logout(), 400);
    }

    let node = React.useRef(false)

    const handleClickList = (e) => {
        if (!node.current.contains(e.target)) {
            setActive(false);
            setLogActive(false)
        }
    };

    React.useEffect(() => {
        document.addEventListener("mousedown", handleClickList);
        return () => {
            document.removeEventListener("mousedown", handleClickList);
        };
    });

    React.useEffect(() => {
        document.addEventListener("touchstart", handleClickList);
        return () => {
            document.removeEventListener("touchstart", handleClickList);
        };
    });

    React.useEffect(() => setAuth(props.isAuth), [])

    return (
        <div ref={node}>
            <div className='nav-hamburger' onClick={() => setActive(!active)}>
                <div className={!active ? "line" : 'line active'}></div>
                <div className={!active ? "line bel" : 'line bel active'}></div>
            </div>
            <div className={!active ? 'nav-bar' : 'nav-bar active'}>
                {auth ?
                    <React.Fragment>
                        <LinkStyled loc='/' name='Home' handleClick={() => setActive(false)}/>
                        <LinkStyled loc='/resources' name='Resources' handleClick={() => setActive(false)}/>
                        <LinkStyled loc='/about' name='About' handleClick={() => setActive(false)}/>
                        {props.admin ?
                            <React.Fragment>
                                <LinkStyled loc='/admin-resources' name='Admin Resources' handleClick={() => setActive(false)}/>
                            </React.Fragment> :
                            null}
                        <LinkStyled loc='/profile' name='Profile' handleClick={() => setActive(false)}/>
                        <div className='nav-logout'>
                            <CustomButton handleClick={handleLogout} text='Logout' logout="true" />
                        </div>
                    </React.Fragment> :
                    <React.Fragment>
                        <LinkStyled loc='/' name='Home' handleClick={() => setActive(false)}/>
                        <LinkStyled loc='/resources' name='Resources' handleClick={() => setActive(false)}/>
                        <LinkStyled loc='/about' name="About" handleClick={() => setActive(false)}/>
                        <div className={logActive ? 'nav-login active' : 'nav-login'}>
                            <p onClick={() => setLogActive(!logActive)}>Login</p>
                        </div>
                        <React.Fragment>
                            <Login
                                {...props}
                                setActive={setActive}
                                active={logActive}
                            />
                        </React.Fragment>
                    </React.Fragment>
                }
            </div>
        </div>
    )
}

export default withRouter(NavBar)