import React from 'react';
import './register-page.styles.css'
import { SelectResource } from '../../components/select-resource/select-resource.component'
import { withRouter } from 'react-router-dom';
import { Form } from '../../components/form/form.component';
import { Loading } from '../../components/loading-icon/loading.component';

const RegisterPage = (props) => {
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [name, setName] = React.useState('');
    const [affiliation, setAffiliation] = React.useState(null);
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [warning, setWarning] = React.useState('');
    const [ loading, setLoading ] = React.useState(false)


    const checkEqual = (pw, pwConf) => {
        if (pw === pwConf && pw.length > 0 && pwConf.length > 0) {
            return true
        } else {
            return false
        }
    }

    const handleResource = (val) => {
        setAffiliation(val);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let equal = checkEqual(password, confirmPassword)
        if (!equal && password.length > 0 && confirmPassword.length > 0) {
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
            confirmPassword: confirmPassword,
            affiliation: affiliation,
            email: email,
            name: name
        }
        fetch(process.env.REACT_APP_LOCATION+'/register', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(response => {
                if (response.errors) {
                    setLoading(false);
                    alert(response.errors.map(a => a.msg).join(' '));
                    return;
                }
                if (response.success) {
                    const loginData={
                        username: username,
                        password: password
                    }
                    setLoading(true)
                    props.handleLogin(e, loginData)
                    return;
                } else {
                    setLoading(false)
                    alert('email/username already exists! Go to Login Page. Or, you can try a different username/email :)');
                    return;
                }
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    }

    return (
        <div className='register'>
            {loading ? 
                <React.Fragment>
                    <h1>Logging you in...</h1>
                    <Loading />
                </React.Fragment> :
            <form className='register-form' onSubmit={handleSubmit}>
                <Form
                    title="username"
                    label="Username"
                    value={username}
                    type="text"
                    changeFunction={setUsername} />
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
                    title="password"
                    label="Password"
                    value={password}
                    type="password"
                    changeFunction={setPassword} />
                <Form
                    title="confirm-password"
                    label="Confirm Password"
                    value={confirmPassword}
                    type="password"
                    changeFunction={setConfirmPassword} />
                <br />
                <p>
                    <label>Affiliation</label>
                    <SelectResource handleResource={handleResource} />
                </p>
                <br />
                <button type='submit'>Submit</button>
            </form>
            }
            {loading ? null : <p className='register-warning'>{warning}</p>}
        </div>
    )
}

export default withRouter(RegisterPage)