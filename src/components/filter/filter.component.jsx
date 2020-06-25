import React from 'react';
import { SelectCity } from '../select-city/select-city.component'
import { ServicesAll } from '../services-all/services-all.component';
import { CustomButton } from '../custom-button/custom-button.component';
import { withRouter } from 'react-router-dom';

const Filter = (props) => {
    const [city, setCity] = React.useState('Boulder');
    const [services, setServices] = React.useState({});

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
                resources: Object.keys(services)
            }
        })
        window.location.reload(false)
    }

    return (
        <React.Fragment>
            <h1>What are you looking for?</h1>
            <br />
            <ServicesAll
                setServices={setServices}
                services={services}
            />
            <SelectCity setVal={setVal}/>
            <CustomButton handleClick={handleSubmit} text='Find!'/>
        </React.Fragment>
    )
}

export default withRouter(Filter)