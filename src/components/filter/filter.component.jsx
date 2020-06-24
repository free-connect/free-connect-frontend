import React from 'react';
import { SelectCity } from '../select-city/select-city.component'
import { Services } from '../services/services.component';
import { withRouter } from 'react-router-dom';

const Filter = (props) => {
    const [city, setCity] = React.useState('Boulder');
    const [services, setServices] = React.useState([]);

    const setVal = (val) => {
        if (val === 'All') {
            setCity('');
            return;
        }
        setCity(val)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        props.history.push({
            pathname: '/resources',
            state: {
                city: city,
                resources: services
            }
        })
        window.location.reload(false)
    }

    return (
        <React.Fragment>
            <Services 
                setServices={setServices} 
                services={services} 
            />
            <SelectCity setVal={setVal} handleSubmit={handleSubmit} />
        </React.Fragment>
    )
}

export default withRouter(Filter)