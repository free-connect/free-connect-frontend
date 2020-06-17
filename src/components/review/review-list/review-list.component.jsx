import React from 'react';

export const ReviewList = (props) => (
    <React.Fragment>
        {props.data[0] ?
            props.data.map(a => {
                return (
                    <React.Fragment>
                        <p>Reviewed by: {a[0]}</p>
                        <p>{a[1]}</p>
                    </React.Fragment>
                )
            }) :
            <p>no reviews!</p>}
    </React.Fragment>
)