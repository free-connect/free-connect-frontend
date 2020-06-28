import React from 'react';
import { CityForm } from '../city-form/city-form.component';
import { ServicesAll } from '../services-all/services-all.component';
import { CustomButton } from '../custom-button/custom-button.component';
import { withRouter } from 'react-router-dom';

const Filter = (props) => {
    const [city, setCity] = React.useState('Boulder');
    const [services, setServices] = React.useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const pushedCity = city === 'All' ? '' : city;
        props.history.push({
            pathname: '/resources',
            state: {
                city: pushedCity,
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
            <h1>Where are you?</h1>
            <br />
            <CityForm setCity={setCity} city={city} />
            <CustomButton handleClick={handleSubmit} text='Find!' />
        </React.Fragment>
    )
}

export default withRouter(Filter)