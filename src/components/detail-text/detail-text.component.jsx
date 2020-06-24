import React from 'react';
import { DeleteDetail } from '../delete-detail/delete-detail.component';
import './detail-text.styles.css'

//start

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
        <React.Fragment>
            {detailArray[0] ?
                <React.Fragment>
                    <ul>
                        {detailArray.map((a, i) => {
                            return (
                                <React.Fragment style={{
                                    display: 'flex'
                                }}>
                                    <DeleteDetail
                                        detailArray={detailArray}
                                        handleDelete={handleDelete}
                                        index={i}
                                    />
                                    <li key={i}>{a}</li>
                                </React.Fragment>
                            )
                        })}
                    </ul>
                </React.Fragment> :
                null
            }
            <input
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
            >
            </input>
            <button onClick={handleSubmitDesc}>add</button>
        </React.Fragment>
    )
}