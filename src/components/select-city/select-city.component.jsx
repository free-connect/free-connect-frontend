import React from 'react';
import { CityForm } from '../city-form/city-form.component';
import './select-city.styles.css'

export const SelectCity = (props) => {
    return (
        <div className="city-select">
            <h1>Where are you?</h1>
            <br />
            <CityForm handleChange={props.setVal} />
        </div>
    )
}