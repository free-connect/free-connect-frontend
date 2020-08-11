import React from 'react';
import './resource.styles.css';
import { CustomButton } from '../../custom-button/custom-button.component';
import { ConfirmationDialog } from '../../new-alert-box/new-alert-box.component';
import { ResourceLink } from '../resource-link/resource-link.component';

import { withRouter } from 'react-router-dom';

const Resource = (props) => {
    const [conf, setConf] = React.useState(false);
    const [description, setDescription] = React.useState('Are you sure you want to delete? Process cannot be reversed.');
    const [options, setOptions] = React.useState(true);

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
    }

    const handleDelete = (e) => {
        e.preventDefault()
        let data = {
            id: props.data._id
        }
        const token = localStorage.getItem('token')
        if (!token) {
            alert('not authorized');
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
                    setOptions(false);
                    setDescription('Successfully deleted!');
                }
            })
            .catch(err => console.log(err))
    }

    const handleClose = () => {
        if (!options) {
            props.history.push('/admin-resources');
            window.location.reload(false);
        } else {
            setConf(false);
        }
    }

    return (
        <div className='resource-box'>
            <ConfirmationDialog
                open={conf}
                title={'DELETING RESOURCE'}
                description={description}
                onSubmit={handleDelete}
                onClose={handleClose}
                options={options}
                closeText={options ? 'Cancel' : 'Close'}
            />
            <div className="resource-left">
                <h3>{props.data.title}</h3>
                <img
                    src={props.data.url}
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
                            <CustomButton handleClick={() => setConf(true)} text='Delete'/> :
                            null
                        }
                        <br />
                        <CustomButton handleClick={handleEditRedirect} text='Edit'/>
                    </div> :
                    null
                }
            </div>
        </div>
    )
}

export default withRouter(Resource)