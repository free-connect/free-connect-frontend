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
            <br />
            <h2>Tell us what you think!</h2>
            <form method='POST' onSubmit={handleSubmit}>
                <textarea 
                    style={{
                        transitionDuration: '.6s',
                        width: !props.active ? '0px' : '200px',
                        height: !props.active ? '0px' : '140px'
                    }} 
                    onChange={(e) => setReviewIn(e.target.value)}
                    value={reviewIn}
                    >
                </textarea>
                <br />
                <br />
                <button 
                    type="submit"
                    style={{
                        transitionDuration: '.2s',
                        width: !props.active ? '0px' : '25%',
                        height: !props.active ? '0px' : '15%',
                        fontSize: !props.active ? '0px' : '70%',
                        cursor: 'pointer'
                    }}
                >
                    Submit
                </button>
            </form>
        </React.Fragment>
    )
}