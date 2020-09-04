import React from 'react';
import './form.styles.css';

export const Form = (props) => {
    const [OGLabel, setOGLabel] = React.useState('')

    React.useEffect(() => {
        setOGLabel(props.label)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <React.Fragment>
            <label htmlFor={props.title}>
                {props.label.length > 0 ? props.label : OGLabel}
            </label>
            <input
                className='custom-form'
                type={props.type}
                name={props.title}
                onChange={(e) => props.changeFunction(e.target.value)}
                placeholder={props.OGLabel}
                value={OGLabel === props.value ? '' : props.value}
            />
        </React.Fragment>
    )
}