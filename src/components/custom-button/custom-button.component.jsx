import React from 'react';
import './custom-button.styles.css'

export const CustomButton = (props) => {
    const [active, setActive] = React.useState(false);
    const [clicked, setClicked] = React.useState(false);

    const handleClick = (e) => {
        setClicked(!clicked);
        if (props.handleClick) {
            props.handleClick(e);
        }
    }

    return (
        <div
            className={
                active ?
                    'custom-button active' :
                    'custom-button'}
            onTouchStart={() => setActive(!active)}
            onMouseEnter={() => setActive(true)}
            onMouseLeave={() => setActive(false)}
            onClick={handleClick}
        >
            <div className="custom-button-name">{props.text}</div>
        </div>
    )
}