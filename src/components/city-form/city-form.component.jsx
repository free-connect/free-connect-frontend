import React from 'react';
import { CustomButton } from '../custom-button/custom-button.component';
import './city-form.styles.css'

export const CityForm = (props) => {
    const [active, setActive] = React.useState(false)

    const cities = ['All', 'Boulder', 'Denver'];

    return (
        <React.Fragment>
            <CustomButton handleClick={() => setActive(!active)} text={'View City'} />
            <br />
            <div className={active ? 'city-drop active' : 'city-drop'}>
                {cities.map((a, i) => {
                    let truthy = false;
                    if (props.city) {
                        truthy = props.city === a ? true : false;
                    }
                    return (
                        <React.Fragment key={i}>
                            <div
                                onClick={() => props.setCity(a)}
                                className={truthy ? 'city-checks active' : 'city-checks'}
                            >
                                {a}
                            </div>
                        </React.Fragment>
                    )
                })}
            </div>
        </React.Fragment>
    )
}