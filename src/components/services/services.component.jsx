import React from 'react';
import { DetailText } from '../detail-text/detail-text.component';
import './services.styles.css'

export const Services = (props) => {

    //we need to consolidate the 'service detail' and 'service' states in the add resource
    //component. 

    const handleChange = (e) => {
        console.log('services: ', props.services, 'detail', props.detail)
        if (props.services.includes(e.target.name)) {
            props.addDetail({ [e.target.name]: '' }, true)
        }
        let newChecked = [...props.services];
        let ind = newChecked.indexOf(e.target.name)
        if (!e.target.checked) {
            newChecked.splice(ind, 1)
            props.setServices(newChecked)
        } else {
            props.setServices([...newChecked, e.target.name]);
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