import React from 'react';
import { DynamicDetail } from '../dynamic-detail/dynamic-detail.component';
import { DeleteDetail } from '../delete-detail/delete-detail.component';
import './dynamic.styles.css';

export const Dynamic = (props) => {
    const [tempName, setTempName] = React.useState('');
    const [tempVal, setTempVal] = React.useState('');

    const handleSubmitDyn = (value) => {
        const newData = [...props.dynamicData, value]
        props.handleDynamic(newData);
        setTempName('')
        setTempVal('')
    }

    const handleDelete = (val) => {
        props.handleDynamic(val);
    }

    //work on making this section into a chart!

    return (
        <React.Fragment>
            <h1>Updates</h1>
            {props.dynamicData[0] ?
                [...props.dynamicData].map((a, i) => {
                    return (
                        <div className='dynamic-block'>
                            <DeleteDetail
                                detailArray={props.dynamicData}
                                index={i}
                                handleDelete={handleDelete}
                            />
                            <span><p>&nbsp;&nbsp;{a.name}:&nbsp;{a.value}&nbsp;</p>
                                <p className='dynamic-block__time'>as of {a.timestamp}</p></span>
                        </div>
                    )
                }) :
                null}
            <DynamicDetail
                handleSubmit={handleSubmitDyn}
                data={props.dynamicData}
                tempName={tempName}
                tempVal={tempVal}
                setTempName={setTempName}
                setTempVal={setTempVal}
            />
        </React.Fragment>
    )
}