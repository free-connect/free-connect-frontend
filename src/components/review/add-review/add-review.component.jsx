import React from 'react';
import { CustomButton } from '../../custom-button/custom-button.component';
import './add-review.styles.css'

export const AddReview = (props) => {
    const [reviewIn, setReviewIn] = React.useState('')

    const handleSubmit = (e) => {
        let tempRev = reviewIn;
        props.handleSubmitReview(e, tempRev);
        setReviewIn('')
    }

    return (
        <React.Fragment>
            <br />
            <h2>Tell us what you think!</h2>
            <div className={props.active ? 'add-review active' : 'add-review'}>
                <textarea
                    className={props.active ? 'add-review-text active' : 'add-review-text'}
                    onChange={(e) => setReviewIn(e.target.value)}
                    value={reviewIn}
                >
                </textarea>
                <br />
                <br />
                <div className={props.active ? 'add-review-button active' : 'add-review-button'}>
                    <CustomButton handleClick={handleSubmit} text='submit' />
                </div>
            </div>
        </React.Fragment>
    )
}