import React from 'react';
import './detail-button.styles.css'

export const DetailButton = (props) => {
    const [active, setActive] = React.useState(false);
    const [purpose, setPurpose] = React.useState('');

    const handleDelete = (index) => {
        const newArr = [...props.detailArray];
        newArr.splice(index, 1);
        props.handleDelete(newArr)
    }

    React.useEffect(() => {
        switch (props.purpose) {
            case 'delete':
                setPurpose('fa fa-trash');
                break;
            case 'edit':
                setPurpose('fa fa-edit');
                break;
            case 'add':
                setPurpose('fa fa-plus');
                break;
            default:
                setPurpose('')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleClick = (e) => {
        if (props.purpose === 'delete') {
            handleDelete(props.index)
        } else {
            props.handleClick(e)
        }
    }

    return (
        <React.Fragment>
            <div className='detail-button'>
                <i
                    className={active ? `active ${purpose}` : `${purpose}`}
                    onMouseOver={() => setActive(true)}
                    onMouseOut={() => setActive(false)}
                    onClick={e => handleClick(e)}
                ></i>&nbsp;&nbsp;
            </div>
        </React.Fragment>
    )
}