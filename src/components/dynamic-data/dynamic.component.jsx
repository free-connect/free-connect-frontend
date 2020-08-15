import React from 'react';
import { DynamicDetail } from '../dynamic-detail/dynamic-detail.component';
import { DeleteDetail } from '../delete-detail/delete-detail.component';
import { ReviewBox } from '../review/review-box/review-box.component';
import './dynamic.styles.css';

export const Dynamic = (props) => {
    const [tempName, setTempName] = React.useState('');
    const [tempVal, setTempVal] = React.useState('');
    const [infoActive, setInfoActive] = React.useState(false)

    const handleSubmitDyn = (value) => {
        if (!tempName && !tempVal) {
            return;
        }
        const newData = [...props.dynamicData, value]
        props.handleDynamic(newData);
        setTempName('')
        setTempVal('')
    }

    const handleClick = (e) => {
        e.preventDefault()
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
        infoActive ? setInfoActive(false) : setInfoActive(true);
    }

    const info="Updates are for information that may change frequently, such as number of available beds, events, housing applications, etc. You can add as many of these as you like! These also come with a timestamp so users can tell the last time the information has been updated."

    //work on making this section into a chart!

    return (
        <React.Fragment>
            <ReviewBox type="info" info={info} active={infoActive} handleClickOff={() => setInfoActive(false)}/>
            <h1>Updates &nbsp;<i onClick={handleClick} className="fa fa-info-circle"></i></h1>
            {props.dynamicData[0] ?
                [...props.dynamicData].map((data, index) => {
                    return (
                        <div key={index} className='dynamic-block'>
                            <DeleteDetail
                                detailArray={props.dynamicData}
                                index={index}
                                handleDelete={(val) => props.handleDynamic(val)}
                            />
                            <span><p>&nbsp;&nbsp;{data.name}:&nbsp;{data.value}&nbsp;</p>
                                <p className='dynamic-block__time'>as of {data.timestamp}</p></span>
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