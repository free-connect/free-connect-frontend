import React from 'react';
import './form.styles.css';

export const Form = (props) => {
    return (
        <React.Fragment>
            <br />
            <label htmlFor={props.title}>
                {props.label}
            </label>
            <input
                className='custom-form'
                type={props.type}
                name={props.title}
                onChange={(e) => props.changeFunction(e.target.value)}
                placeholder={props.label} 
                />
        </React.Fragment>
    )
}