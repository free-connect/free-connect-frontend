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

    const handleDelete = (val) => {
        setDetailArray(val);
        props.addDetail({ [props.name]: val })
    }

    React.useEffect(() => onLoad(), [])

    const handleSubmitDesc = (e) => {
        e.preventDefault();
        const val = description;
        let newArr = [...detailArray]
        newArr = newArr.concat(val);
        props.addDetail({ [props.name]: newArr })
        setDescription('')
        setDetailArray(newArr);
        return;
    }

    return (
        <div className='detail-text'>
            {detailArray[0] ?
                <React.Fragment>
                        {detailArray.map((a, i) => {
                            return (
                                <div className='detail-text__delete'>
                                    <DeleteDetail
                                        detailArray={detailArray}
                                        handleDelete={handleDelete}
                                        index={i}
                                    />
                                    <p key={i}>&nbsp;&nbsp;{a}</p>
                                </div>
                            )
                        })}
                </React.Fragment> :
                null
            }
            <div className='detail-add'>
                <AddButton handleClick={handleSubmitDesc} />
                <input
                    type="text"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                >
                </input>
            </div>
        </div>
    )
}