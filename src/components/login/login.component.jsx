import React from 'react';
import './login.styles.css'
import { withRouter } from 'react-router-dom';
import { Form } from '../../components/form/form.component';
import { LinkStyled } from '../../components/navigation/link-styled/link-styled.component';
import { CustomButton } from '../custom-button/custom-button.component';

const Login = (props) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const data = {
        username: username,
        password: password
    }

    const handleLogin = (e) => {
        props.handleLogin(e, data)
    }

    const handleLoginKey = (e) => {
        if (e.key !== 'Enter') {
            return;
        }
        if (!username || !password) {
            alert("can't have blank username or password")
            return;
        }
        handleLogin(e)
    };

    const handleInactive = () => {
        if (!props.active) {
            setUsername('');
            setPassword('')
        }
        return;
    }

    React.useEffect(() => handleInactive())

    return (
        <div className={props.active ? 'login-comp active' : 'login-comp'}>
            <div
                className='login-form'
                onKeyPress={handleLoginKey}
            >
                <Form
                    title="email/username"
                    label="Email"
                    value={username}
                    type="text"
                    changeFunction={setUsername}
                    color='white'
                />
                <Form
                    title="password"
                    label="Password"
                    value={password}
                    type="password"
                    changeFunction={setPassword}
                    color='white'
                />
                <br />
                <CustomButton text='Login' handleClick={handleLogin} />
            </div>
            <div className='login-text'>
                <LinkStyled loc='/reset' name='Forgot password?' />
                <br />
                <LinkStyled loc='/register' name='Not a member?' />
            </div>
        </div>
    )
}

export default withRouter(Login)