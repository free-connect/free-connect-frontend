import React from 'react';
import { TextField } from '@material-ui/core';
import './form.styles.css';

export const Form = (props) => {
    return (
        <React.Fragment>
            <TextField 
                id="standard-basic" 
                label={props.title}
                type={props.type}
                onChange={(e) => props.changeFunction(e.target.value)}
                onKeyPress={props.handleKeyPress ? props.handleKeyPress : null}
                value={props.label}
            />
        </React.Fragment>
    )
}