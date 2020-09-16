import React from 'react';
import { withRouter } from 'react-router-dom';
import './resource.styles.css';

import { CustomButton } from '../../custom-button/custom-button.component';
import { ResourceLink } from '../resource-link/resource-link.component';
import { AlertBoxContext } from '../../../util/context/alertContext';

const Resource = (props) => {
    const [state, setState] = React.useContext(AlertBoxContext);

    const handleDetail = () => {
        props.history.push({
            pathname: '/detail',
            state: {
                data: props.data
            }
        })
        return;
    }

    const handleEditRedirect = () => {
        props.history.push({
            pathname: "/edit-resource",
            state: {
                data: props.data,
                edit: true
            }
        })
        return;
    };

    const handleDelete = (e) => {
        e.preventDefault()
        let data = {
            id: props.data._id
        }
        const token = localStorage.getItem('token')
        if (!token) {
            setState({
                ...state,
                options: false,
                open: true,
                description: 'Not Authorized',
                closeText: 'Close'
            });
            return
        }
        fetch(process.env.REACT_APP_LOCATION + '/delete-resource', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'bearer ' + token
            }
        })
            .then(res => res.json())
            .then(response => {
                if (response.success) {
                    setState({
                        ...state,
                        options: false,
                        open: true,
                        title: 'Successfully deleted!',
                        description: '',
                        closeText: ''
                    });
                    return true;
                }
            })
            .then(() => {
                props.history.push('/admin-resources');
                window.location.reload(false);
            })
            .catch(err => console.log(err))
    }

    const deleteConfirmationBox = () => {
        const newState = {
            open: true,
            options: true,
            closeText: 'Cancel',
            title: 'Caution! Deleting Resource',
            description: 'Are you sure you want to delete? Process cannot be reversed.',
            onSubmit: handleDelete
        }
        setState(newState);
    }

    return (
        <div className='resource-box'>
            <div className="resource-left">
                <h3>{props.data.title}</h3>
                <img
                    src={props.data.url !== 'none' ? props.data.url : require('../../../images/no-image.jpg')}
                    alt={props.data.title}
                    height='80vw'
                    width='80vw'
                />
                <br />
                <p>{props.data.address}</p>
                <p>{props.data.city ? props.data.city : 'none'}, CO</p>
                <br />
                <p>{props.data.phone}</p>
                <br />
                <ResourceLink website={props.data.website} />
            </div>
            <div className="resource-right">
                <ul>
                    {Object.keys(props.data.services).map((a, i) => <li key={i}>{a}</li>)}
                </ul>
                <br />
                <CustomButton handleClick={handleDetail} text='Details' />
                <br />
                {props.admin ?
                    <div className='delete-resource'>
                        {!props.profile ?
                            <CustomButton handleClick={deleteConfirmationBox} text='Delete' /> :
                            null
                        }
                        <br />
                        <CustomButton handleClick={handleEditRedirect} text='Edit' />
                    </div> :
                    null
                }
            </div>
        </div>
    )
}

export default withRouter(Resource)