import React from 'react';

export const AddReview = (props) => {
    const [reviewIn, setReviewIn] = React.useState('')

    const handleSubmit = async (e) => {
        let tempRev = reviewIn;
        await props.handleSubmitReview(e, tempRev);
        await setReviewIn('')
    }

    return(
        <React.Fragment>
            <h1>Tell us what you think!</h1>
            <form method='POST' onSubmit={handleSubmit}>
                <textarea 
                    style={{
                        transitionDuration: '.6s',
                        width: !props.active ? '0px' : '275px',
                        height: !props.active ? '0px' : '160px'
                    }} 
                    onChange={(e) => setReviewIn(e.target.value)}
                    value={reviewIn}
                    >
                </textarea>
                <button type="submit">
                    Submit
                </button>
            </form>
        </React.Fragment>
    )
}