import React from 'react';
import './review-list.styles.css';

export const ReviewList = (props) => (
    <div className='review-list-block'>
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
    </div>
)