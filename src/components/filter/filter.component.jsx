import React from 'react';
import './filter.styles.css'
import { ButtonAndDropdown } from '../button-and-dropdown/button-and-dropdown.component';
import { CustomButton } from '../custom-button/custom-button.component';
import { withRouter } from 'react-router-dom';

const Filter = (props) => {
    const [city, setCity] = React.useState('All');
    const [services, setServices] = React.useState([]);

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
        <div className="filter-block">
            <h1>What are you looking for?</h1>
            <br />
            <ButtonAndDropdown
                purpose='services'
                text='View Services'
                setServices={setServices}
                services={services}
            />
            <h1>Where are you?</h1>
            <br />
            <ButtonAndDropdown
                purpose='city'
                text='View City'
                setCity={setCity}
                city={city}
            />
            <CustomButton handleClick={handleSubmit} text='Find!' />
        </div>
    )
}

export default withRouter(Filter)