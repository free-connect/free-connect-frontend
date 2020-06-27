import React from 'react';
import './add-button.styles.css'

export const AddButton = (props) => {
    const [active, setActive] = React.useState(false)

    return (
        <React.Fragment>
            <div
                onMouseOver={() => setActive(true)}
                onMouseOut={() => setActive(false)}
                className={active ? 'detail-add__symbol active' : 'detail-add__symbol'}
                onClick={(e) => props.handleClick(e)}>
                +&nbsp;&nbsp;
            </div>
        </React.Fragment>
    )
}