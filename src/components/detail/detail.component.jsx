import React from 'react';
import { withRouter } from 'react-router-dom';

const Detail = (props) => {
    const [data, setData] = React.useState({})

    const getDetails = (pushedData) => {
        fetch('/details?id='+pushedData._id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            //this section is going to be used to load details, which need to be set up in the model! 
            //still trying to decide how I want to model those and how the admins will configure
            .then(response => {
                setData({...pushedData, details: response.data})
            })
            .catch(err => console.log('error and data', err, data))
    }

    React.useState(() => getDetails(props.location.state.data), []);

    return(
        <div>
            <br />
            <br />
            <br />
            <br />
            <br />
            {data ? Object.keys(data).map(a => <p>{a}: </p>) : null}
            <p>Hello</p>
        </div>
    )
}

export default withRouter(Detail)