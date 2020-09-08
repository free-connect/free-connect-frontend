import React from 'react';
import { DynamicDetail } from '../dynamic-detail/dynamic-detail.component';
import { ReviewBox } from '../review/review-box/review-box.component';
import { DetailButton } from '../detail-button/detail-button.component';
import './dynamic.styles.css';

export const Dynamic = (props) => {
    const [infoActive, setInfoActive] = React.useState(false)

    const handleSubmitDyn = (value, editIndex) => {
        let newData = [...props.dynamicData]
        if (editIndex > -1) {
            newData.splice(editIndex, 1, value)
        } else {
            newData = [...newData, value];
        }
        props.handleDynamic(newData);
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

    const handleEdit = (index) => {
        const newData = [...props.dynamicData];
        newData[index].edit = true;
        props.handleDynamic(newData);
    }

    const info = "Updates are for information that may change frequently, such as number of available beds, events, housing applications, etc. You can add as many of these as you like! These also come with a timestamp so users can tell the last time the information has been updated."

    //work on making this section into a chart!

    return (
        <React.Fragment>
            <ReviewBox
                type="info"
                info={info}
                active={infoActive}
                handleClickOff={() => setInfoActive(false)}
            />
            <h1>Updates &nbsp;<i onClick={handleClick} className="fa fa-info-circle"></i></h1>
            {props.dynamicData[0] ?
                [...props.dynamicData].map((data, index) => {
                    return (
                        <React.Fragment key={index}>
                            {data.edit ?
                                <React.Fragment>
                                    <DynamicDetail
                                        handleSubmit={handleSubmitDyn}
                                        data={data}
                                        tempName={data.name}
                                        tempVal={data.value}
                                        index={index}
                                    />
                                </React.Fragment> :
                                <div className='dynamic-block'>
                                    <DetailButton
                                        purpose='edit'
                                        handleClick={() => handleEdit(index)}
                                    />
                                    <DetailButton
                                        purpose='delete'
                                        index={index}
                                        handleDelete={(val) => props.handleDynamic(val)}
                                        detailArray={props.dynamicData}
                                    />
                                    <span><p>&nbsp;&nbsp;{data.name}:&nbsp;{data.value}&nbsp;</p>
                                        <p className='dynamic-block__time'>as of {data.timestamp}</p></span>
                                </div>}
                        </React.Fragment>
                    )
                }) :
                null}
            <DynamicDetail
                handleSubmit={handleSubmitDyn}
                data={props.dynamicData}
            />
        </React.Fragment>
    )
}