import React from 'react';
import { CustomButton } from '../custom-button/custom-button.component';
import './city-form.styles.css'

export const CityForm = (props) => {
    const [active, setActive] = React.useState(false)

    const handleDropdown = (e) => {
        e.preventDefault();
        setActive(!active);
    }

    const cities = ['Boulder', 'Denver', 'All'];

    return (
        <React.Fragment>
            <CustomButton handleClick={handleDropdown} text={'view city'} />
            <br />
            <div
                style={{
                    maxHeight: active ?
                        '200px' :
                        '0px'
                }}
                className='city-drop'
            >
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