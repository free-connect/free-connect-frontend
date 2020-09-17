import React from 'react';
import './register-page.styles.css'
import { SelectResource } from '../../components/select-resource/select-resource.component'
import { withRouter } from 'react-router-dom';
import { Form } from '../../components/form/form.component';
import { Loading } from '../../components/loading-icon/loading.component';
import { AlertBoxContext } from '../../util/context/alertContext';
import { CustomButton } from '../../components/custom-button/custom-button.component';
import { quickAlert } from '../../util/functions';
import { handleEnterKey } from '../../util/functions';

const RegisterPage = (props) => {
    const [state, setState] = React.useContext(AlertBoxContext);
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
            setWarning('must enter a value for all fields.');
            return;
        } else if (password.length <= 12 || confirmPassword.length <= 12) {
            setWarning('Password is too short, must be 12 characters or more. Try a passphrase! For instance, "Monkeyk@ratemobile!"');
            return;
        }
        setLoading(true)
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
                    const message = response.errors.map(a => a.msg).join(' ')
                    quickAlert(message, state, setState);
                    return;
                }
                if (response.success) {
                    const loginData={
                        username: username,
                        password: password
                    }
                    props.handleLogin(e, loginData)
                    return;
                } else {
                    setLoading(false)
                    const message = 'email/username already exists! Go to Login Page. Or, you can try a different username/email :)';
                    quickAlert(message, state, setState);
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
                    <h1>Getting you registered!</h1>
                    <Loading />
                </React.Fragment> :
            <div 
                className='register-form'
                onKeyDown={e => handleEnterKey(e, handleSubmit)}
                >
                <Form
                    title="Username"
                    label={username}
                    type="text"
                    changeFunction={setUsername} />
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
                    title="Password"
                    label={password}
                    type="password"
                    changeFunction={setPassword} />
                <Form
                    title="Confirm Password"
                    label={confirmPassword}
                    type="password"
                    changeFunction={setConfirmPassword} />
                <br />
                <p>
                    <label>Affiliation</label>
                    <SelectResource handleResource={handleResource} />
                </p>
                <br />
                <CustomButton 
                    text="submit" 
                    handleClick={handleSubmit}
                />
            </div>
            }
            {loading ? null : <p className='register-warning'>{warning}</p>}
        </div>
    )
}

export default withRouter(RegisterPage)