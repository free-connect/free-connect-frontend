import React from 'react';
import { Form } from '../../components/form/form.component';
import { Loading } from '../../components/loading-icon/loading.component';
import { CustomButton } from '../../components/custom-button/custom-button.component';
import { AlertBoxContext } from '../../util/context/alertContext';
import { quickAlert } from '../../util/functions';

import { withRouter } from 'react-router-dom';
import './reset-page.styles.css'

const ResetPage = (props) => {
    const [state, setState] = React.useContext(AlertBoxContext);
    const [email, setEmail] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const handleReset = (e) => {
        e.preventDefault()
        if (!email) {
            const message = 'Please enter a value.';
            quickAlert(message, state, setState)
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
                    const message = ('reset email sent! Please check your inbox for further instructions.')
                    quickAlert(message, state, setState)
                    props.history.push('/');
                } else {
                    setLoading(false);
                    quickAlert(res.message, state, setState)
                }
            })
            .catch(err => {
                setLoading(false);
                quickAlert(err, state, setState)
                console.log(err)
            })
    }

    const handleEnter = (e) => {
        if (e.key !== 'Enter') {
            return;
        } else {
            handleReset(e)
        }
    }

    return (
        <React.Fragment>
            {loading ?
                <Loading /> :
                <div className='reset-form' onKeyDown={handleEnter}>
                    <label>Please enter email address associated with your profile.</label>
                    <Form
                        title="Email"
                        label={email}
                        type="email"
                        changeFunction={setEmail} />
                    <CustomButton handleClick={handleReset} text={'Send Reset Code!'}/>
                </div>
            }
        </React.Fragment>
    )
}

export default withRouter(ResetPage);