import React from 'react';
import { DetailButton } from '../detail-button/detail-button.component';
import './dynamic-detail.styles.css'

export const DynamicDetail = (props) => {
    const [tempName, setTempName] = React.useState('');
    const [tempVal, setTempVal] = React.useState('');

    React.useEffect(() => {
        if (props.tempName) {
            setTempName(props.tempName)
        }
        if (props.tempVal) {
            setTempVal(props.tempVal)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubmitDesc = (e) => {
        e.preventDefault()
        if (!tempName || !tempVal) {
            return;
        }
        if (props.data.length > 14) {
            return;
        }
        const date = new Date();
        const val = {
            name: tempName,
            value: tempVal,
            timestamp: date.toString().split(' ').splice(0, 5).join(' ')
        }
        props.handleSubmit(val, props.index);
        setTempName('');
        setTempVal('')
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
                    <DetailButton
                        purpose='add'
                        handleClick={handleSubmitDesc}
                    />
                    <input
                        value={tempName}
                        onChange={e => setTempName(e.target.value)}
                        onKeyPress={handleEnter}
                        placeholder='name'
                    ></input>&nbsp;
                    <input
                        value={tempVal}
                        onChange={e => setTempVal(e.target.value)}
                        onKeyPress={handleEnter}
                        placeholder='information'
                    ></input>
                </div>
            </div>
        </React.Fragment>
    )
}