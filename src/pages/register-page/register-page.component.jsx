import React from 'react';
import { withRouter } from 'react-router-dom';
import { Form } from '../../components/form/form.component';

const RegisterPage = (props) => {
    const [username, setUsername] = React.useState('');
    const [resources, setResources] = React.useState([]);
    const [email, setEmail] = React.useState('');
    const [name, setName] = React.useState('');
    const [affiliation, setAffiliation] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [warning, setWarning] = React.useState('')

    const checkEqual = (pw, pwConf) => {
        if (pw === pwConf && pw.length>0 && pwConf.length>0) {
            return true
        } else {
            return false
        }
    }

    const handleDropdown = (e) => {
        e.preventDefault();
        let resource = resources.find(a => a.title === e.target.value);
        setAffiliation(resource._id)
    }

    const loadResources = () => {
        fetch('/data/resources?register=true')
                .then(response => response.json())
                .then(newData => {
                    console.log('data', newData)
                    setResources(newData)
                })
                .catch(err => console.log(err))
    }

    React.useEffect(() => loadResources(), [])

    const handleSubmit = (e) => {
        e.preventDefault();
        let equal = checkEqual(password, confirmPassword)
        if (!equal && password.length>0 && confirmPassword.length>0) {
            setWarning('passwords not equal');
            setPassword('');
            setConfirmPassword('');
            return;
        } else if (!equal) {
            setWarning('must enter a value');
            return;
        }
        const data = {
            username: username,
            password: password,
            affiliation: affiliation,
            email: email,
            name: name
        }
        fetch('/register', {
            method: "POST", 
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                }
            })
            .then(res => res.json())
            .then(response => {
                if (response.msg) {
                    alert('approved!');
                    props.history.push('/login')
                } else {
                    alert('email/username already exists! Go to Login Page, idiot. Or, you can try a different username/email :)');
                    props.history.push('/login')
                }
            })
            .catch(err => console.log(err))
    }

    return(
        <div>
            <form className='register-form' onSubmit={handleSubmit}>
                <Form 
                    title="username" 
                    label="username" 
                    value={username} 
                    type="text" 
                    changeFunction = {setUsername}/>
                <Form 
                    title="name" 
                    label="name" 
                    value={name} 
                    type="text" 
                    changeFunction = {setName}/>
                <Form 
                    title="email" 
                    label="Email" 
                    value={email} 
                    type="email" 
                    changeFunction = {setEmail}/>
                <Form 
                    title="password"
                    label="password" 
                    value={password} 
                    type="password" 
                    changeFunction = {setPassword}/>
                <Form 
                    title="confirm-password" 
                    label="Confirm Password" 
                    value={confirmPassword} 
                    type="password" 
                    changeFunction = {setConfirmPassword}/>
                    <p>
                        <label>Affiliation</label>
                        <select 
                            id = "resources" 
                            onChange={handleDropdown}>
                                <option disabled selected="selected">Select a Resource</option>
                                {resources.map(a => {
                                    return(
                                        <React.Fragment>
                                            <option>{a.title}</option>
                                        </React.Fragment>
                                    )
                                })}
                        </select>
                    </p>
                <button type='submit'>Submit</button>
            </form>
        <p>{warning}</p>
        </div>
    )
}

export default withRouter(RegisterPage)