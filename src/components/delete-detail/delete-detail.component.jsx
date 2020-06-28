import React from 'react';

export const DeleteDetail = (props) => {
    const [active, setActive] = React.useState(false)

    const handleDeleteDesc = (index) => {
        const newArr = [...props.detailArray];
        newArr.splice(index, 1);
        props.handleDelete(newArr)
    }

    return (
        <React.Fragment>
            <p
                onMouseEnter={() => setActive(true)}
                onMouseOut={() => setActive(false)}
                style={{
                    cursor: 'pointer',
                    fontSize: '15px',
                    backgroundColor: active ? 'red' : 'transparent',
                    color: active ? 'white' : 'red'
                }}
                onClick={() => handleDeleteDesc(props.index)}>X</p>
        </React.Fragment>
    )
}