import React from 'react';
import './city-form.styles.css';

export const CityForm = (props) => {
    const cities = ['All', 'Boulder', 'Denver'];

    return (
        <React.Fragment>
            {cities.map((selectedCity, key) => {
                let selected = false;
                if (props.city) {
                    selected = props.city === selectedCity ? true : false;
                }
                return (
                    <React.Fragment key={key}>
                        <div
                            onClick={() => props.setCity(selectedCity)}
                            className={selected ? 'city-checks active' : 'city-checks'}
                        >
                            {selectedCity}
                        </div>
                    </React.Fragment>
                )
            })}
        </React.Fragment>
    )
}