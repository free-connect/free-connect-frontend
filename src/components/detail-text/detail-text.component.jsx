import React from 'react';
import { DeleteDetail } from '../delete-detail/delete-detail.component';
import { AddButton } from '../add-button/add-button.component';
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

    React.useEffect(() => onLoad(), [])

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
                            <div key={key} className='detail-text__delete'>
                                <DeleteDetail
                                    detailArray={detailArray}
                                    handleDelete={handleDelete}
                                    index={key}
                                />
                                <p>&nbsp;&nbsp;{serviceDetail}</p>
                            </div>
                        )
                    })}
                </React.Fragment> :
                null
            }
            <div className='detail-add'>
                <AddButton handleClick={handleSubmitDescription} />
                <textarea
                    type="text"
                    cols="40"
                    rows="8"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    onKeyPress={handleEnter}
                >
                </textarea>
            </div>
        </div>
    )
}