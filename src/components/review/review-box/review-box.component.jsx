import React from 'react';
import './review-box.styles.css';
import { AddReview } from '../add-review/add-review.component';
import { ReviewList } from '../review-list/review-list.component'

export const ReviewBox = (props) => {
    const handleClickRev = (e) => {
        if (!node.current.contains(e.target)) {
            props.handleClickOff();
        }
    };

    React.useEffect(() => {
        document.addEventListener("mousedown", handleClickRev);
        return () => {
            document.removeEventListener("mousedown", handleClickRev);
        };
    });

    React.useEffect(() => {
        document.addEventListener("touchstart", handleClickRev);
        return () => {
            document.removeEventListener("touchstart", handleClickRev);
        };
    });

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