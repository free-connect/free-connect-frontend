import React from 'react';
import './login.styles.css'
import { withRouter } from 'react-router-dom';
import { LinkStyled } from '../../components/navigation/link-styled/link-styled.component';
import { CustomButton } from '../custom-button/custom-button.component';
import { AlertBoxContext } from '../../util/context/alertContext';
import { quickAlert, handleEnterKey } from '../../util/functions';
import { Form } from '../form/form.component';

const Login = (props) => {
    const [state, setState] = React.useContext(AlertBoxContext);
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleLogin = (e) => {
        if (!username || !password) {
            const errorMessage = "Can't have blank username or password";
            quickAlert(errorMessage, state, setState)
            return;
        }
        const data = {
            username: username,
            password: password
        }
        props.handleLogin(e, data);
    }

    const handleInactive = () => {
        if (!props.active) {
            setUsername('');
            setPassword('');
        }
        return;
    }

    React.useEffect(() => {
        handleInactive();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.active]);

    React.useEffect(() => state.open ? props.setAlert(true) : props.setAlert(false), [props, state])

    return (
        <div className={props.active ? 'login-comp active' : 'login-comp'}>
            <div
                className='login-form'
                onKeyPress={e => handleEnterKey(e, handleLogin)}
            >
                <Form
                    type="text"
                    changeFunction={setUsername}
                    title="Email/Username"
                    label={username}
                />
                <Form
                    type="password"
                    changeFunction={setPassword}
                    title="Password"
                    label={password}
                />
                <br />
                <CustomButton text='Login' handleClick={handleLogin} />
            </div>
            <div className='login-text'>
                <br />
                <LinkStyled loc='/reset' name='Forgot password?' handleClick={() => props.setActive(false)} />
                <br />
                <LinkStyled loc='/register' name='Not a member?' handleClick={() => props.setActive(false)} />
            </div>
        </div>
    )
}

export default withRouter(Login)