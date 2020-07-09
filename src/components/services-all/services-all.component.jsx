import React from 'react';
import { CustomButton } from '../custom-button/custom-button.component';
import { DetailText } from '../detail-text/detail-text.component';
import './services-all.styles.css'

export const ServicesAll = (props) => {
    const [active, setActive] = React.useState(false)

    const handleChange = (val, bool) => {
        let newChecked = { ...props.services };
        if (bool) {
            delete newChecked[val]
            props.setServices(newChecked)
        } else {
            props.setServices({ ...newChecked, [val]: [] });
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
                {servicesList.map((a, i) => {
                    let truthy = false;
                    if (props.services) {
                        truthy = Object.keys(props.services).includes(a) ? true : false;
                    }
                    return (
                        <React.Fragment key={i}>
                            <div
                                onClick={() => handleChange(a, truthy)}
                                className={truthy ? 'filter-checks active' : 'filter-checks'}
                            >
                                <p>{a}</p>
                            </div>
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
            </div>
        </React.Fragment>
    )
}