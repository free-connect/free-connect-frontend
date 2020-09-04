import React from 'react';
import './delete-detail.styles.css'

export const DeleteDetail = (props) => {
    const [deleteActive, setDeleteActive] = React.useState(false)

    const handleDeleteDesc = (index) => {
        const newArr = [...props.detailArray];
        newArr.splice(index, 1);
        props.handleDelete(newArr)
    }

    return (
        <React.Fragment>
            <p
                onMouseEnter={() => setDeleteActive(true)}
                onMouseOut={() => setDeleteActive(false)}
                className={deleteActive ? 'detail-delete__symbol active' : 'detail-delete__symbol'}
                onClick={() => handleDeleteDesc(props.index)}>X</p>
        </React.Fragment>
    )
}