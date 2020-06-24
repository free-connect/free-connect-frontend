import React from 'react';

export const DynamicDetail = (props) => {

    const handleSubmitDesc = (e, i) => {
        e.preventDefault()
        const date = new Date();
        const val = {
            name: props.tempName,
            value: props.tempVal,
            timestamp: date.toString().split(' ').splice(0, 5).join(' ')
        }
        props.handleSubmit(val);
    }

    return (
        <React.Fragment>
            <label>information</label>
            <input value={props.tempName} onChange={e => props.setTempName(e.target.value)}></input>
            <label>value</label>
            <input value={props.tempVal} onChange={e => props.setTempVal(e.target.value)}></input>
            <button onClick={(e) => handleSubmitDesc(e, props.index)}>submit</button>
        </React.Fragment>
    )
}