import React from 'react';
import './button.styles.css'

export const CustomButton = (props) => {
    const [active, setActive] = React.useState(false)

    return(
        <div 
            className={active ? 'custom-button active' : props.disabled ? 'custom-button disabled' : 'custom-button'} 
            onClick={props.handleClick}
            onMouseEnter={() => setActive(true)}
            onMouseLeave={() => setActive(false)}
            >
                <div className="button_name">{props.text}</div>
        </div>
    )
}