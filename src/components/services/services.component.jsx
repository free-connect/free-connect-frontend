import React from 'react';
import { DetailText } from '../detail-text/detail-text.component';
import './services.styles.css'

export const Services = (props) => {

    const handleChange = (e) => {
        if (props.services.includes(e.target.name)) {
            props.addDetail({ [e.target.name]: '' }, true)
            props.handleChange(e)
        } else {
            props.handleChange(e)
        }
    }

    const servicesList = [
        'Housing',
        'Medical Care',
        'Mental Health Care',
        'Benefits',
        'Veterans Services',
        'Shelter',
        'Food'
    ];

    const path = props.location ? props.location.pathname : null

    return (
        <React.Fragment>
            {servicesList.map((a, i) => {
                let truthy = false;
                if (props.services) {
                    truthy = props.services.includes(a) ? true : false;
                }
                return (
                    <React.Fragment key={i}>
                        <label
                            className='custom-label'
                            htmlFor={`Service${i + 1}`}>{a}
                            <input
                                onChange={handleChange}
                                type='checkbox'
                                className='custom-checks'
                                checked={truthy}
                                name={a} />
                            <span className='custom-checkbox'></span>
                        </label>
                        {truthy &&
                            (path === '/admin-resources' ||
                                path === '/edit-resource' ||
                                path === '/profile') ?
                            <DetailText
                                name={a}
                                addDetail={props.addDetail}
                                {...props}
                            /> :
                            null
                        }
                    </React.Fragment>
                )
            })}
        </React.Fragment>
    )
}