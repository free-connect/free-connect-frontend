import React from 'react';
import './custom-button.styles.css'

export const CustomButton = (props) => {
    const [active, setActive] = React.useState(false);

    return (
        <div
            className={
                active ?
                    'custom-button active' :
                    'custom-button'}
            onTouchStart={() => setActive(!active)}
            onMouseEnter={() => setActive(true)}
            onMouseLeave={() => setActive(false)}
            onClick={e => props.handleClick ? props.handleClick(e) : null}
        >
            <div className="custom-button-name">{props.text}</div>
        </div>
    )
}