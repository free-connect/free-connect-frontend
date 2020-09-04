import React from 'react';
import { CustomButton } from '../custom-button/custom-button.component';
import { DetailText } from '../detail-text/detail-text.component';
import { DropDown } from '../styles/drop-down/drop-down.component';
import './services-all.styles.css'

export const ServicesAll = (props) => {
    const [active, setActive] = React.useState(false);

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
        'Domestic Violence'
    ];

    return (
        <React.Fragment>
            <CustomButton handleClick={() => setActive(!active)} text='View Services' />
            <br />
            <DropDown active={active} add={props.add}>
                {servicesList.map((service, key) => {
                    let active = false;
                    if (props.services) {
                        active = Object.keys(props.services).includes(service) ? true : false;
                    }
                    return (
                        <React.Fragment key={key}>
                            <div
                                onClick={() => handleChange({ [service]: [] }, active)}
                                className={active ? 'filter-checks active' : 'filter-checks'}
                            >
                                <p>{service}</p>
                            </div>
                            {active && props.add ?
                                <DetailText
                                    name={service}
                                    handleChange={handleChange}
                                    {...props}
                                /> :
                                null
                            }
                        </React.Fragment>
                    )
                })}
                {props.add ? <p className='service-note'>*Don't see any services that fit your nonprofit? Let's add it! Head over to the Contact Page to send a request to include an additional service that can benefit your community, and it'll be included within 24 hours.</p> : null}

            </DropDown>
        </React.Fragment>
    )
}