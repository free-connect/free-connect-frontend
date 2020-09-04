import React from 'react';
import './drop-down.styles.css'

export const DropDown = (props) => {

    const customClass = props.add ? 'custom-drop-add' : 'custom-drop';

    return (
        <div className={props.active ? `${customClass} active` : `${customClass}`}>
            {props.children}
        </div>
    )
}