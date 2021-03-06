import React from 'react';
import './contact-page.styles.css'
import { Form } from '../../components/form/form.component';
import { Loading } from '../../components/loading-icon/loading.component';
import { CustomButton } from '../../components/custom-button/custom-button.component';
import { AlertBoxContext } from '../../util/context/alertContext';
import { TextareaAutosize } from '@material-ui/core';
import { quickAlert } from '../../util/functions';

export const ContactPage = () => {
    const [state, setState] = React.useContext(AlertBoxContext);
    const [email, setEmail] = React.useState('');
    const [name, setName] = React.useState('');
    const [subject, setSubject] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [loading, setLoading] = React.useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!subject || !message || !email || !name) {
            const message = 'Please fill out all fields.';
            quickAlert(message, state, setState);
            return;
        };
        setLoading(true);
        const data = {
            email: email,
            name: name,
            subject: subject,
            message: message
        }
        fetch(process.env.REACT_APP_LOCATION + '/contact', {
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
                    setName('')
                    setSubject('')
                    setMessage('')
                    setLoading(false)
                    alert('Thanks for sending!')
                } else {
                    setLoading(false)
                    alert(res.message)
                }
            })
            .catch(err => {
                setLoading(false);
                alert('hmmm something went wrong');
                console.log(err);
            })
    };

    return (
        <React.Fragment>
            {loading ?
                <Loading /> :
                <div className='contact-page'>
                    <h1>Contact Page</h1>
                    <p>Have a question about the site? Want to volunteer? Interested in expanding? Feel free to reach out!</p>
                    <Form
                        title="Name"
                        label={name}
                        type="text"
                        changeFunction={setName} />
                    <Form
                        title="Email"
                        label={email}
                        type="email"
                        changeFunction={setEmail} />
                    <Form
                        title="Subject"
                        label={subject}
                        type="text"
                        changeFunction={setSubject} />
                    <br />
                    <p>Message</p>
                    <TextareaAutosize
                        aria-label="empty textarea"
                        cols={40}
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                    />
                    <br />
                    <CustomButton handleClick={handleSubmit} text="Submit!" />
                    <br />
                </div>
            }
        </React.Fragment>
    )
}

