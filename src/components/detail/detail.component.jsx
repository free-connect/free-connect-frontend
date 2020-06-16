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
            //this section is going to be used to load details, which need to be set up in the model! 
            //still trying to decide how I want to model those and how the admins will configure
            .then(response => {
                setData({ ...pushedData, details: response.data })
            })
            .then(() => setLoaded(true))
            .catch(err => console.log('error and data', err, data))
    }

    React.useState(() => props.location.state ? getDetails(props.location.state.data) : setLoaded(true), []);

    return (
        <div onClick={() => console.log(data)} className='resource-detail'>
            {Object.keys(data)[0] && loaded ?
                <React.Fragment>
                    <div className='left-detail'>
                        <h3>{data.title}</h3>
                        <br />
                        <img
                            src={data.url}
                            alt={data.title}
                            height='auto'
                            width='auto'
                        />
                        <br />
                    </div>
                    <div className='right-detail'>
                        <ul>
                            {Object.keys(data.services).map(a => <li>{a}</li>)}
                        </ul>
                        <br />
                        <p>{data.address}</p>
                        <p>{data.city ? data.city : 'none'}, CO</p>
                        <br />
                        <p>{data.phone}</p>
                        <br />
                    </div>
                </React.Fragment> :
                loaded ?
                    <p>Thanks for checking out resource details! Head over to the resoure page to browse a list of available resources in your area</p> :
                    null
                //import loading icon here and have some kind of time out
            }
        </div>
    )
}

export default withRouter(Detail)