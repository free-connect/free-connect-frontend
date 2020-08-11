import React from 'react';
import './resource-link.styles.css';

export const ResourceLink = (props) => {
    const [active, setActive] = React.useState(false)

    return (
        <a
            className={active ? 'resource-link active' : 'resource-link'}
            href={props.website}
            onMouseOver={() => setActive(true)}
            onMouseOut={() => setActive(false)}
        >
            Click to visit
        </a>
    )
}