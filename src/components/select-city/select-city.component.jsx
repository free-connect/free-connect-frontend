import React from 'react';
import { CityForm } from '../city-form/city-form.component';
import './select-city.styles.css'

export const SelectCity = (props) => {
    return(
        <form onSubmit={props.handleSubmit} className="city-select">
                <fieldset>
                    <legend>Where are you?</legend>
                    <CityForm handleChange={props.setVal}/>
                </fieldset>
                <button type="submit">Let's find some resources!</button>
            </form>
    )
}