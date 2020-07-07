import React from 'react';
import './review-box.styles.css';
import { AddReview } from '../add-review/add-review.component';
import { ReviewList } from '../review-list/review-list.component'

export const ReviewBox = (props) => {
    React.useEffect(() => {
        document.addEventListener("mousedown", handleClickRev);
        return () => {
            document.removeEventListener("mousedown", handleClickRev);
        };
    });

    const handleClickRev = (e) => {
        if (!node.current.contains(e.target)) {
            props.handleClickOff();
        }
    };

    const node = React.useRef(null)

    return (
        <div ref={node} className={`review-box ${!props.active ? '' : 'active'}`}>
            <p onClick={props.handleClickOff}>X</p>
            {props.type === 'list' ?
                <ReviewList {...props} /> :
                <AddReview {...props} />
            }
        </div>
    )
}