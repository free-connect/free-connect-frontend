import React from 'react';
import { Form } from '../../components/form/form.component';
import { withRouter } from 'react-router-dom';
import './reset-page.styles.css'

const ResetPage = (props) => {
    const [email, setEmail] = React.useState('')

    const handleReset = (e) => {
        e.preventDefault()
        const data = {
            email: email
        }
        fetch(process.env.REACT_APP_LOCATION + '/reset', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(res => {
                console.log(res, res.success)
                if (res.success) {
                    setEmail('')
                    alert('reset email sent! Please check your inbox for further instructions.')
                    props.history.push('/');
                } else {
                    alert(res.message)
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <form className='reset-form' onSubmit={handleReset}>
            <Form
                title="email"
                label="Please enter email address associated with your profile."
                value={email}
                type="email"
                changeFunction={setEmail} />
            <button type='submit'>Send reset email</button>
        </form>
    )
}

export default withRouter(ResetPage);