import React from 'react';

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
        <div className='checks' onChange={e => props.handleChange(e)}>
            {servicesList.map((a,i) => {
                let truthy = false;
                if (props.services) {
                    truthy = props.services.includes(a) ? true : false;
                }
                return(
                <React.Fragment key={i}>
                    <input type='checkbox' checked={truthy} name={a}/>
                        <label htmlFor={`Service${i+1}`}>{a}</label>
                </React.Fragment>
                )
            })}
        </div>
    )
}