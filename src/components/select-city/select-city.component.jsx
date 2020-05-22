import React from 'react';

export const SelectCity = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
                <fieldset>
                    <legend>Where are you?</legend>
                    <p>
                        <label>Cities</label>
                        <select id = "myList" onChange={(e) => props.setVal(e.target.value)}>
                            <option >Boulder</option>
                            <option >Denver</option>
                        </select>
                    </p>
                </fieldset>
                <button type="submit">Let's find some resources!</button>
            </form>
    )
}