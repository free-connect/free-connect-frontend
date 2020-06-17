import React from 'react';
import './review-box.styles.css';
import { AddReview } from '../add-review/add-review.component';
import { ReviewList } from '../review-list/review-list.component'

export const ReviewBox = (props) => {
    React.useEffect(() => {
        document.addEventListener("mousedown", handleClickList);
        return () => {
            document.removeEventListener("mousedown", handleClickList);
        };
    });

    const handleClickList = (e) => {
        if (!node.current.contains(e.target)) {
            props.handleClickOff()
        }
    };

    const node = React.useRef(null)

    return (
        <div ref={node} className={`review-box ${!props.active ? '' : 'active'}`}>
            {props.type === 'list' ?
                <ReviewList {...props} /> :
                <AddReview {...props} />
            }
        </div>
    )
}