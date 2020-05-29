import React from 'react';
import './select-city.styles.css'

export const SelectCity = (props) => {
    return(
        <form onSubmit={props.handleSubmit} className="city-select">
                <fieldset>
                    <legend>Where are you?</legend>
                    <p>
                        <label>Cities</label>
                        <select id = "myList" onChange={(e) => props.setVal(e.target.value)}>
                            <option >Boulder</option>
                            <option >Denver</option>
                            <option>All</option>
                        </select>
                    </p>
                </fieldset>
                <button type="submit">Let's find some resources!</button>
            </form>
    )
}