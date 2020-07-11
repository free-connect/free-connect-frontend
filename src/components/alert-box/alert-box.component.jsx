import React from 'react';
import './alert-box.styles.css';
import { CustomButton } from '../custom-button/custom-button.component';

export const AlertBox = (props) => {

    return (
        <div className={props.alert ? 'alert-box-block active' : 'alert-box-block'}>
            <p>{props.alertMessage}</p>
            {props.confirm ?
                <React.Fragment>
                    <CustomButton text="yes" handleClick={() => props.handleConfirm(true)} />
                    <CustomButton text="no" handleClick={() => props.handleConfirm(false)} />
                </React.Fragment> :
                null
            }
        </div>
    )
}