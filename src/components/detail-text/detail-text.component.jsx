import React from 'react';
import { DetailButton } from '../detail-button/detail-button.component';
import { TextareaAutosize } from '@material-ui/core';
import './detail-text.styles.css'

export const DetailText = (props) => {
    const [detailArray, setDetailArray] = React.useState([]);
    const [description, setDescription] = React.useState('');

    const onLoad = () => {
        if (Object.keys(props.services).includes(props.name)) {
            setDetailArray(props.services[props.name])
        }
    }

    const handleDelete = (newArray) => {
        setDetailArray(newArray);
        const newValue = { [props.name]: newArray }
        props.handleChange(newValue)
    }

    React.useEffect(() => {
        onLoad();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleEnter = (e) => {
        if (e.key !== 'Enter') {
            return;
        }
        handleSubmitDescription(e)
    }

    const handleSubmitDescription = (e) => {
        e.preventDefault();
        if (!description) {
            return;
        }
        const newDescriptionData = [...detailArray, description]
        if (newDescriptionData.length > 15) {
            return;
        }
        const newDetail = { [props.name]: newDescriptionData };
        props.handleChange(newDetail)
        setDescription('')
        setDetailArray(newDescriptionData);
        return;
    }

    return (
        <div className='detail-text'>
            {detailArray[0] ?
                <React.Fragment>
                    {detailArray.map((serviceDetail, key) => {
                        return (
                            <div key={key} className='detail-text-line'>
                                <DetailButton
                                    purpose='delete'
                                    detailArray={detailArray}
                                    handleDelete={handleDelete}
                                    index={key}
                                />
                                <p>{serviceDetail}</p>
                            </div>
                        )
                    })}
                </React.Fragment> :
                null
            }
            <div className='detail-add'>
                <DetailButton
                    purpose='add'
                    handleClick={handleSubmitDescription}
                />
                <TextareaAutosize
                    aria-label="empty textarea"
                    cols={40}
                    type="text"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    onKeyPress={handleEnter}
                />
            </div>
        </div>
    )
}