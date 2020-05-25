import React from 'react';
import './review.styles.css'

export const Review = (props) => {
    const [reviewIn, setReviewIn] = React.useState('')

    React.useEffect(() => {
        console.log(props.active)
        document.addEventListener("mousedown", handleClick);
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    });

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
            <form method='POST' onSubmit={(e) => props.handleSubmitReview(e, reviewIn)}>
                <textarea 
                    style={{
                        transitionDuration: '.6s',
                        width: !props.active ? '0px' : '275px',
                        height: !props.active ? '0px' : '160px'
                    }} 
                    onChange={(e) => setReviewIn(e.target.value)}
                    >
                </textarea>
                <button type="submit">
                    Submit
                </button>
            </form>
        </div>
    )
}