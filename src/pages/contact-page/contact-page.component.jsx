import React from 'react';
import './contact-page.styles.css'
import { Form } from '../../components/form/form.component';
import { Loading } from '../../components/loading-icon/loading.component';
import { CustomButton } from '../../components/custom-button/custom-button.component';

export const ContactPage = () => {
    const [email, setEmail] = React.useState('');
    const [name, setName] = React.useState('');
    const [subject, setSubject] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [loading, setLoading] = React.useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
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
    }

    return (
        <React.Fragment>
            {loading ?
                <Loading /> :
                <div className='contact-page'>
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
                    <br />
                    <CustomButton handleClick={handleSubmit} text="Submit!"/>
                    <br />
                </div>
            }
        </React.Fragment>
    )
}

