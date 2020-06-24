import React from 'react';
import { CustomButton } from '../custom-button/custom-button.component';

export const ReviewButton = (props) => {

    return (
        <div
            onClick={props.handleClick}
            onTouchStartCapture={() => {
                props.handleHover(true)
            }}
            onMouseEnter={() => {
                props.handleHover(true)
            }}
            onMouseOut={() => {
                props.handleHover(false)
            }}
        >
            <CustomButton {...props}/>
        </div>
    )
}