import React from 'react';
import './like-button.styles.css'

export const LikeButton = (props) => {
    const [thumbActive, setThumbActive] = React.useState(false)

    return (
        <div className='like-block'>
            <br />
            {props.userLikes ? <p>liked!</p> : <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>}
            <i
                className={thumbActive ? "fa fa-thumbs-o-up active" : "fa fa-thumbs-o-up"}
                onClick={props.handleLike}
                onMouseEnter={() => setThumbActive(true)}
                onMouseOut={() => setThumbActive(false)}
            >
            </i>
        </div>
    )
}