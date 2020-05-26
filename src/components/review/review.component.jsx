import React from 'react';
import './review.styles.css';

export const Review = (props) => {
    const [reviewIn, setReviewIn] = React.useState('')

    React.useEffect(() => {
        document.addEventListener("mousedown", handleClick);
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    });

    const handleSubmit = async (e) => {
        let tempRev = reviewIn;
        await props.handleSubmitReview(e, tempRev);
        await setReviewIn('')
    }

    const handleClick = (e) => {
        if (!node.current.contains(e.target)) {
            props.handleClickOff() 
            }
        };

    const node = React.useRef(null)

    return(
        <div 
            ref={node}
            className={`display-box ${!props.active ? '' : 'active'}`}>
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
        </div>
    )
}