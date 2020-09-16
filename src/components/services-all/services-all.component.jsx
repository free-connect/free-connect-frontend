import React from 'react';
import { DetailText } from '../detail-text/detail-text.component';
import './services-all.styles.css'

export const ServicesAll = (props) => {
    const handleChange = (serviceToBeAdded, deleteService = false) => {
        let name = Object.keys(serviceToBeAdded)[0];
        let newServices = { ...props.services };
        if (deleteService) {
            delete newServices[name];
        } else {
            newServices = { ...newServices, ...serviceToBeAdded }
        }
        props.setServices(newServices);
    }

    const servicesList = [
        'Housing',
        'Medical Care',
        'Mental Health Care',
        'Benefits',
        'Veterans Services',
        'Shelter',
        'Food',
        'Legal',
        'Employment',
        'Civil Rights',
        'Domestic Violence',
        'Financial Assistance'
    ];

    return (
        <React.Fragment>
            {servicesList.map((service, key) => {
                let selected = false;
                if (props.services) {
                    selected = Object.keys(props.services).includes(service) ? true : false;
                }
                return (
                    <React.Fragment key={key}>
                        <div
                            onClick={() => handleChange({ [service]: [] }, selected)}
                            className={selected ? 'filter-checks active' : 'filter-checks'}
                        >
                            <p>{service}</p>
                        </div>
                        {selected && props.add ?
                            <React.Fragment>
                                {props.add ? <h5>Resource Details: </h5> : null}
                                <DetailText
                                    name={service}
                                    handleChange={handleChange}
                                    {...props}
                                />
                            </React.Fragment> :
                            null
                        }
                    </React.Fragment>
                )
            })}
            {props.add ?
                <p className='service-note'>
                    *Don't see any services that fit your nonprofit? Let's add it! Head over to the Contact Page to send a request to include an additional service that can benefit your community, and it'll be included within 24 hours.
                </p> :
                null
            }
        </React.Fragment>
    )
}