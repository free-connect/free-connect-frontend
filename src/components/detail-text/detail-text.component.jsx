import React from 'react';
import './detail-text.styles.css'

export const DetailText = (props) => {
    const [detailArray, setDetailArray] = React.useState([]);
    const [description, setDescription] = React.useState('');

    const onLoad = () => {
        console.log(props.name, props.detail, 'in detail')
        if (Object.keys(props.detail).includes(props.name)) {
            setDetailArray(props.detail[props.name])
        }
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

    const handleDeleteDesc = (index) => {
        const newArr = [...detailArray];
        newArr.splice(index, 1);
        setDetailArray(newArr);
        props.addDetail({ [props.name]: newArr })
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
                                    <p
                                        style={{
                                            cursor: 'pointer',
                                            color: 'red'
                                        }}
                                        onClick={() => handleDeleteDesc(i)}>X</p>
                                    <li key={i}>{a}</li>
                                </React.Fragment>
                            )
                        })}
                    </ul>
                    <input
                        type="text"
                        onChange={(e) => setDescription(e.target.value)}>
                    </input>
                    <button onClick={handleSubmitDesc}>add</button>
                </React.Fragment> :
                <React.Fragment>
                    <input
                        type="text"
                        onChange={(e) => setDescription(e.target.value)}>
                    </input>
                    <button onClick={handleSubmitDesc}>add</button>
                </React.Fragment>
            }
        </React.Fragment>
    )
}