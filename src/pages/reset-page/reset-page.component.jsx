import React from 'react';
import { Form } from '../../components/form/form.component';
import { Loading } from '../../components/loading-icon/loading.component';
import { withRouter } from 'react-router-dom';
import './reset-page.styles.css'

const ResetPage = (props) => {
    const [email, setEmail] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const handleReset = (e) => {
        e.preventDefault()
        if (!email) {
            alert('Please enter a value.')
            return;
        }
        setLoading(true)
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
                if (res.success) {
                    setLoading(false)
                    setEmail('')
                    alert('reset email sent! Please check your inbox for further instructions.')
                    props.history.push('/');
                } else {
                    setLoading(false);
                    alert(res.message)
                }
            })
            .catch(err => {
                setLoading(false);
                alert(err)
                console.log(err)
            })
    }

    return (
        <React.Fragment>
            {loading ?
                <Loading /> :
                <form className='reset-form' onSubmit={handleReset}>
                    <Form
                        title="email"
                        label="Please enter email address associated with your profile."
                        value={email}
                        type="email"
                        changeFunction={setEmail} />
                    <button type='submit'>Send reset email</button>
                </form>
            }
        </React.Fragment>
    )
}

export default withRouter(ResetPage);