import React from 'react';
import './link-styled.styles.css';
import { NavLink } from 'react-router-dom'

export const LinkStyled = (props) => {
    const [active, setActive] = React.useState(false);

    const handleOver = () => {
        setActive(true)
    }

    const handleOut = () => {
        setActive(false)
    }

    return(
        <React.Fragment>
            <NavLink 
                onMouseOver={handleOver}
                onMouseOut={handleOut}
                className={`nav ${!active ? '' : 'active'}`}
                activeClassName='nav-active' 
                exact={props.loc === '/' ? true : false} 
                to = {props.loc}>
                    {props.name}
            </NavLink>
        </React.Fragment>
    )
}