import React from 'react';
import { AddButton } from '../add-button/add-button.component';
import './dynamic-detail.styles.css'

export const DynamicDetail = (props) => {

    const handleSubmitDesc = (e) => {
        e.preventDefault()
        if (props.data.length > 14) {
            return;
        }
        const date = new Date();
        const val = {
            name: props.tempName,
            value: props.tempVal,
            timestamp: date.toString().split(' ').splice(0, 5).join(' ')
        }
        props.handleSubmit(val);
    }

    const handleEnter = (e) => {
        if (e.key !== 'Enter') {
            return;
        }
        handleSubmitDesc(e)
    }

    return (
        <React.Fragment>
            <div className='dynamic-detail-box'>
                <div className='dynamic-detail-add'>
                    <AddButton handleClick={handleSubmitDesc} data={props.data} />
                    <input
                        value={props.tempName}
                        onChange={e => props.setTempName(e.target.value)}
                        onKeyPress={handleEnter}
                        placeholder='name'
                    ></input>&nbsp;
                    <input
                        value={props.tempVal}
                        onChange={e => props.setTempVal(e.target.value)}
                        onKeyPress={handleEnter}
                        placeholder='information'
                    ></input>
                </div>
            </div>
        </React.Fragment>
    )
}