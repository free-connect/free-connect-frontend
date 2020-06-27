import React from 'react';
import { DynamicDetail } from '../dynamic-detail/dynamic-detail.component';
import { DeleteDetail } from '../delete-detail/delete-detail.component';
import './dynamic.styles.css';

export const Dynamic = (props) => {
    const [tempName, setTempName] = React.useState('');
    const [tempVal, setTempVal] = React.useState('');

    const handleSubmit = (value) => {
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
            <h1>
                Dynamic Data (data that may
                change from day to day)
            </h1>
            {props.dynamicData[0] ?
                [...props.dynamicData].map((a, i) => {
                    return (
                        <React.Fragment>
                            <DeleteDetail
                                detailArray={props.dynamicData}
                                index={i}
                                handleDelete={handleDelete}
                            />
                            <p>{a.name}</p>
                            <p>{a.value}</p>
                            <p>{a.timestamp}</p>
                        </React.Fragment>
                    )
                }) :
                null}
            <DynamicDetail
                handleSubmit={handleSubmit}
                data={props.dynamicData}
                tempName={tempName}
                tempVal={tempVal}
                setTempName={setTempName}
                setTempVal={setTempVal}
            />
        </React.Fragment>
    )
}