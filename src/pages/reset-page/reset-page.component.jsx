import React from 'react';
import { Form } from '../../components/form/form.component';
import './reset-page.styles.css'

export const ResetPage = () => {
    const [email, setEmail] = React.useState('')

    const handleReset = () => {
        return;
    }

    return (
        <form onSubmit={handleReset} className='reset-form'>
            <Form
                title="email"
                label="Please enter email address associated with your profile."
                value={email}
                type="text"
                changeFunction={setEmail} />
            <button type='submit'>Send reset email</button>
        </form>
    )
}