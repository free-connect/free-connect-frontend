import React from 'react';
import './edit-button.styles.css'

export const EditButton = (props) => {
    const [editActive, setEditActive] = React.useState(false)

    return (
        <React.Fragment>
            <i 
                onMouseEnter={() => setEditActive(true)}
                onMouseOut={() => setEditActive(false)}
                className={editActive ? "fa fa-edit active" : "fa fa-edit" } 
                onClick={props.handleEdit}
            ></i>
        </React.Fragment>
    )
}