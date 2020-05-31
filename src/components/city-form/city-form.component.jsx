import React from 'react';

export const CityForm = (props) => {
    return(
        <React.Fragment>
            <p>
                <label>Cities</label>
                <select onChange={(e) => props.handleChange(e.target.value)}>
                    <option >Boulder</option>
                    <option >Denver</option>
                    <option>All</option>
                </select>
            </p>
        </React.Fragment>
    )
}