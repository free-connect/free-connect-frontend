import React from 'react';
import { CustomButton } from '../custom-button/custom-button.component';
import { DetailText } from '../detail-text/detail-text.component';
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
        'Civil Rights'
    ];

    return (
        <React.Fragment>
            <CustomButton handleClick={() => setActive(!active)} text={'View Services'} />
            <br />
            <div
                className={
                    active && props.add ?
                        'filter-drop active__add' :
                        active ?
                            'filter-drop active' :
                            'filter-drop'
                }
            >
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
            </div>
        </React.Fragment>
    )
}