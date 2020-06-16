import React from 'react';
import { CustomButton } from '../custom-button/custom-button.component';

export const ReviewButton = (props) => {
    const [active, setActive] = React.useState(false)

    return (
        <div
            onClick={props.handleClick}
            onTouchStartCapture={() => {
                setActive(true);
                props.handleHover(true)
            }}
            onMouseEnter={() => {
                setActive(true);
                props.handleHover(true)
            }}
            onMouseOut={() => {
                setActive(false);
                props.handleHover(false)
            }}
        >
            <CustomButton {...props} active={active} />
        </div>
    )
}