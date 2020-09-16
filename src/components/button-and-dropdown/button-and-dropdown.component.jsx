import React from 'react';
import { CustomButton } from '../custom-button/custom-button.component';
import { DropDown } from '../styles/drop-down/drop-down.component';
import { ServicesAll } from '../services-all/services-all.component';
import { CityForm } from '../city-form/city-form.component';
import './button-and-dropdown.styles.css';

export const ButtonAndDropdown = (props) => {
    const [active, setActive] = React.useState(false)

    let node = React.useRef(false)

    const handleClickOff = (e) => {
        if (!node.current.contains(e.target)) {
            setActive(false);
        }
    };

    React.useEffect(() => {
        document.addEventListener("mousedown", handleClickOff);
        return () => {
            document.removeEventListener("mousedown", handleClickOff);
        };
    });

    React.useEffect(() => {
        document.addEventListener("touchstart", handleClickOff);
        return () => {
            document.removeEventListener("touchstart", handleClickOff);
        };
    });


    return (
        <div className="button-drop-cluster" ref={node}>
            <CustomButton
                handleClick={() => setActive(!active)}
                text={props.text}
            />
            <br />
            <DropDown
                setActive={setActive}
                active={active}
                add={props.add}
            >
                {props.purpose === 'city' ?
                    <CityForm {...props}/> :
                    <ServicesAll {...props}/>
                }
            </DropDown>
        </div>
    )
}