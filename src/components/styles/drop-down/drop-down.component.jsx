import React from 'react';
import './drop-down.styles.css'

export const DropDown = (props) => {

    const customClass = props.add ? 'custom-drop-add' : 'custom-drop';

    let node = React.useRef(false)

    const handleClickOff = (e) => {
        if (!node.current.contains(e.target)) {
            props.setActive(false);
        }
    };

    React.useEffect(() => {
        document.addEventListener("mousedown", handleClickOff);
        return () => {
            document.removeEventListener("mousedown", handleClickOff);
        };
    });

    React.useEffect(() => {
        document.addEventListener("touchstart", handleClickOff);
        return () => {
            document.removeEventListener("touchstart", handleClickOff);
        };
    });


    return (
        <div
            ref={node}
            className={props.active ?
                `${customClass} active` :
                `${customClass}`}
        >
            {props.children}
        </div>
    )
}