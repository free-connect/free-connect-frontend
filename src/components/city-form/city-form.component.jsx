import React from 'react';
import { CustomButton } from '../custom-button/custom-button.component';
import { DropDown } from '../styles/drop-down/drop-down.component';
import './city-form.styles.css'

export const CityForm = (props) => {
    const [active, setActive] = React.useState(false)

    const cities = ['All', 'Boulder', 'Denver'];

    return (
        <React.Fragment>
            <CustomButton
                handleClick={() => setActive(!active)}
                text={'View City'}
            />
            <br />
            <DropDown setActive={setActive} active={active} add={props.add}>
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
            </DropDown>
        </React.Fragment>
    )
}