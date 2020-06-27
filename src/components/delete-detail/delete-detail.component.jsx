import React from 'react';

export const DeleteDetail = (props) => {

    const handleDeleteDesc = (index) => {
        const newArr = [...props.detailArray];
        newArr.splice(index, 1);
        props.handleDelete(newArr)
    }

    return (
        <React.Fragment>
            <p
                style={{
                    cursor: 'pointer',
                    color: 'red',
                    fontSize: '15px'
                }}
                onClick={() => handleDeleteDesc(props.index)}>X</p>
        </React.Fragment>
    )
}