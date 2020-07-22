import React from 'react';
import './contact-page.styles.css'
import { Form } from '../../components/form/form.component';

export const ContactPage = () => {
    const [email, setEmail] = React.useState('');
    const [name, setName] = React.useState('');
    const [subject, setSubject] = React.useState('');
    const [message, setMessage] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
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
                    alert('Thanks for sending!')
                } else {
                    alert(res.message)
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <form className='contact-page' onSubmit={handleSubmit}>
            <h1>Contact Page</h1>
            <p>Have a question about the site? Want to volunteer? Interested in expanding? Feel free to reach out!</p>
            <Form
                title="name"
                label="Name"
                value={name}
                type="text"
                changeFunction={setName} />
            <Form
                title="email"
                label="Email"
                value={email}
                type="email"
                changeFunction={setEmail} />
            <Form
                title="subject"
                label="Subject"
                value={subject}
                type="text"
                changeFunction={setSubject} />
                <br />
            <p>Message</p>
            <textarea value={message} onChange={e => setMessage(e.target.value)}></textarea>
            <button type='submit'>Send!</button>
        </form>
    )
}

