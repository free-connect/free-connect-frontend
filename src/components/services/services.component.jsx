import React from 'react';
import { DetailText } from '../detail-text/detail-text.component';
import './services.styles.css'

export const Services = (props) => {

    const handleChange = (e) => {
        if (Object.keys(props.services).includes(e.target.name)) {
            props.addDetail({ [e.target.name]: '' }, true)
        }
        let newChecked = { ...props.services };
        if (!e.target.checked) {
            delete newChecked[e.target.name]
            props.setServices(newChecked)
        } else {
            props.setServices({ ...newChecked, [e.target.name]: [] });
        }
    }

    const servicesList = [
        'Housing',
        'Medical Care',
        'Mental Health Care',
        'Benefits',
        'Veterans Services',
        'Shelter',
        'Food',
        'Legal'
    ];

    return (
        <React.Fragment>
            {servicesList.map((a, i) => {
                let truthy = false;
                if (props.services) {
                    truthy = Object.keys(props.services).includes(a) ? true : false;
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
                        {truthy && props.add ?
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