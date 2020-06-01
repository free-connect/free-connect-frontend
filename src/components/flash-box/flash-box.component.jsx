import React from 'react';
import { ReviewList } from '../review/review-list/review-list.component';
import { AddReview } from '../review/add-review/add-review.component'
import './flash-box.styles.css';

export const FlashBox = (props) => {
    return(
        <div className={`flash-box ${!props.active ? '' : 'active'}`}>
            {props.type === 'list' ? 
                <ReviewList {...props} /> : 
                <AddReview {...props}/>
            }
        </div>
    )
}