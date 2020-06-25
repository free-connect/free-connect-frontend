import React from 'react';
import { withRouter } from 'react-router-dom';
import './detail.styles.css'

const Detail = (props) => {
    const [data, setData] = React.useState({})
    const [loaded, setLoaded] = React.useState(false)

    const getDetails = (pushedData) => {
        if (!pushedData) {
            return;
        }
        fetch('/details?id=' + pushedData._id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(response => {
                setData({ ...pushedData, details: response.data })
            })
            .then(() => setLoaded(true))
            .catch(err => console.log(err))
    }

    React.useState(() => props.location.state ? getDetails(props.location.state.data) : setLoaded(true), []);

    return (
        <div className='resource-detail'>
            {Object.keys(data)[0] && loaded ?
                <React.Fragment>
                    <div className='left-detail'>
                        <h3>{data.title}</h3>
                        <br />
                        <a href={data.website}>
                            <img
                                src={data.url}
                                alt={data.title}
                                height='auto'
                                width='80%'
                            />
                        </a>
                        <br />
                        {data.dynamicData.map(a => {
                            return (
                                <React.Fragment style={{ display: 'flex' }}>
                                    <p>{a.name}</p>
                                    <p>{a.value}</p>
                                    <p style={{opacity: '.5'}}>As of {a.timestamp}</p>
                                </React.Fragment>
                            )
                        })}
                    </div>
                    <div className='right-detail'>
                        <br />
                        <p>{data.address}</p>
                        <br />
                        <p>{data.city ? `${data.city}, CO` : 'none specified'}</p>
                        <br />
                        <p>{data.phone}</p>
                        <br />
                        {Object.keys(data.services).map(a => {
                            return (
                                <React.Fragment>
                                    <h4>{a}</h4>
                                    <ul>
                                        {data.services[a].map(b => <li>{b}</li>)}
                                    </ul>
                                </React.Fragment>
                            )
                        })}
                    </div>
                </React.Fragment> :
                loaded ?
                    <p>Thanks for checking out resource details! Head over to the resoure page to browse a list of available resources in your area</p> :
                    null
            }
        </div>
    )
}

export default withRouter(Detail)