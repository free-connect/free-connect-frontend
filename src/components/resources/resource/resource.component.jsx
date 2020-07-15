import React from 'react';
import { CustomButton } from '../../custom-button/custom-button.component';

import './resource.styles.css';
import { Link, withRouter } from 'react-router-dom';

const Resource = (props) => {
    const [aActive, setAActive] = React.useState(false)

    const handleDetail = () => {
        props.history.push({
            pathname: '/detail',
            state: {
                data: props.data
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
        fetch(process.env.REACT_APP_LOCATION+'/delete-resource', {
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
                    alert('Successfully Deleted!');
                    props.history.push('/admin-resources');
                    window.location.reload(false);
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='resource-box'>
            <div className="resource-left">
                <h3>{props.data.title}</h3>
                <img
                    src={`${process.env.REACT_APP_LOCATION}/${props.data.url}`}
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
            </div>
            <div className="resource-right">
                <ul>
                    {Object.keys(props.data.services).map((a, i) => <li key={i}>{a}</li>)}
                </ul>
                <br />
                <CustomButton handleClick={handleDetail} text='Details' />
                <br />
                <br />
                <a
                    className={aActive ? 'resource-right__anchor active' : 'resource-right__anchor'}
                    href={props.data.website}
                    onMouseOver={() => setAActive(true)}
                    onMouseOut={() => setAActive(false)}
                >
                    Click to visit {props.data.name}
                </a>
                {props.admin ?
                    <div className='delete-resource'>
                        {!props.profile ?
                            <React.Fragment>
                                <button
                                    onClick={handleDelete}>
                                    Delete
                        </button>
                            </React.Fragment> :
                            null
                        }
                        <Link
                            to={{
                                pathname: "/edit-resource",
                                state: {
                                    data: props.data,
                                    edit: true
                                }
                            }}>Edit</Link>
                    </div> :
                    null
                }
            </div>
        </div>
    )
}

export default withRouter(Resource)