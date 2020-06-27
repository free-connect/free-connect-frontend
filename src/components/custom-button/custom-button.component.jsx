import React from 'react';
import './custom-button.styles.css'

export const CustomButton = (props) => {
    const [active, setActive] = React.useState(false);

    return (
        <div
            style={{
                width: props.logout ? '100%' : '60%'
            }}
            className={
                active ?
                    'custom-button active' :
                    props.disabled ?
                        'custom-button disabled' :
                        'custom-button'}
            onMouseEnter={() => setActive(true)}
            onMouseLeave={() => setActive(false)}
            onClick={props.handleClick ? props.handleClick : null}
        >
            <div className="custom-button-name">{props.text}</div>
        </div>
    )
}