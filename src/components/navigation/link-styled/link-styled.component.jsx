import React from 'react';
import './link-styled.styles.css';
import { NavLink } from 'react-router-dom'

export const LinkStyled = (props) => {
    const [active, setActive] = React.useState(false);

    return (
        <div className='link-styled-block'>
            <NavLink
                onMouseOver={() => setActive(true)}
                onMouseOut={() => setActive(false)}
                className={`nav ${!active ? '' : 'active'}`}
                activeClassName='nav-active'
                exact={props.loc === '/' ? true : false}
                to={props.loc}>
                {props.name}
            </NavLink>
        </div>
    )
}