import React from 'react';
import './custom-button.styles.css'

export const CustomButton = (props) => {
    return (
        <div className={props.active ? 'custom-button active' : props.disabled ? 'custom-button disabled' : 'custom-button'}>
            <div className="custom-button-name">{props.text}</div>
        </div>
    )
}