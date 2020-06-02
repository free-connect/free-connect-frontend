import React from 'react';
import './services.styles.css'

export const Services = (props) => {

    const servicesList = [
        'Housing', 
        'Medical Care', 
        'Mental Health Care', 
        'Benefits', 
        'Veterans Services', 
        'Shelter', 
        'Food'
    ];

    return(
        <React.Fragment>
            {servicesList.map((a,i) => {
                let truthy = false;
                if (props.services) {
                    truthy = props.services.includes(a) ? true : false;
                }
                return(
                <React.Fragment key={i}>
                    <label 
                            className='custom-label'
                            htmlFor={`Service${i+1}`}>{a}
                    <input 
                        onChange={e => props.handleChange(e)} 
                        type='checkbox' 
                        className='custom-checks' 
                        checked={truthy} 
                        name={a}/>
                    <span className='custom-checkbox'></span>
                    </label>
                </React.Fragment>
                )
            })}
        </React.Fragment>
    )
}