import React from 'react';
import './review-list.styles.css';

export const ReviewList = (props) => {
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
    
    return(
        <div ref={node} className={`review-list ${!props.active ? '' : 'active'}`}>
            {props.data[0] ? 
            props.data.map(a => {
                return(
                    <React.Fragment>
                        <p>Reviewed by: {a[0]}</p>
                        <p>{a[1]}</p>
                    </React.Fragment>
                )
            }) : 
            <p>no reviews!</p>}
        </div>
    )
}