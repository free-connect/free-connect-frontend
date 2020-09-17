import React from 'react';
import { TextField } from '@material-ui/core';

export const Form = (props) => {
    return (
        <React.Fragment>
            <br />
            <TextField
                id="standard-basic" 
                InputProps={{
                    style: {
                        fontFamily: "'Prata', serif"
                    }
                }}
                label={props.title}
                type={props.type}
                onChange={(e) => props.changeFunction(e.target.value)}
                onKeyPress={props.handleKeyPress ? props.handleKeyPress : null}
                value={props.label}
            />
        </React.Fragment>
    )
}