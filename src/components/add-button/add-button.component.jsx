import React from 'react';
import './add-button.styles.css'

export const AddButton = (props) => {
    const [active, setActive] = React.useState(false)

    return (
        <React.Fragment>
            <div>
                <p
                    className={active ? 'detail-add__symbol active' : 'detail-add__symbol'}
                    onMouseOver={() => setActive(true)}
                    onMouseOut={() => setActive(false)}
                    onClick={(e) => props.handleClick(e)}
                >+</p>&nbsp;&nbsp;
            </div>
        </React.Fragment>
    )
}