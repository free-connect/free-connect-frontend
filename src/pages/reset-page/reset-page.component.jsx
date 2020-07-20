import React from 'react';
import { Form } from '../../components/form/form.component';
import './reset-page.styles.css'

export const ResetPage = () => {
    const [email, setEmail] = React.useState('')

    const handleReset = () => {
        fetch(process.env.REACT_APP_LOCATION + '/reset')
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    return (
        <div className='reset-form'>
            <Form
                title="email"
                label="Please enter email address associated with your profile."
                value={email}
                type="text"
                changeFunction={setEmail} />
            <button onClick={handleReset} type='submit'>Send reset email</button>
        </div>
    )
}