import React from 'react';
import './detail-services.styles.css'

export const DetailServices = (props) => {
    const [active, setActive] = React.useState(false);

    return (
        <div className='detail-service'>
            <h3
                onClick={() => setActive(!active)}
            >{active ? '' : '- '}{props.service}</h3>
            <ul className={active ? 'detail-service__list active' : 'detail-service__list'}>
                {props.details.map((detail, key) => <li key={key}>{detail}</li>)}
            </ul>
        </div>
    )
}