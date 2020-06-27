import React from 'react';
import './login.styles.css'
import { withRouter} from 'react-router-dom';
import { Form } from '../../components/form/form.component';
import { LinkStyled } from '../../components/navigation/link-styled/link-styled.component';

const Login = (props) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    
    const data = {
        username: username,
        password: password
    }

    return (
        <div className={props.active ? 'login-comp active' : 'login-comp'}>
            <form className='login-form' onSubmit={(e) => props.handleLogin(e, data)}>
                <Form
                    title="username"
                    label="username/email"
                    value={username}
                    type="text"
                    changeFunction={setUsername} />
                <Form
                    title="password"
                    label="password"
                    value={password}
                    type="password"
                    changeFunction={setPassword} />
                <br />
                <button type='submit'>Submit</button>
            </form>
            <div className='login-text'>
            <LinkStyled loc='/reset' name='Forgot password?'/>
            <br />
            <LinkStyled loc='/register' name='Not a member?'/>
            </div>
        </div>
    )
}

export default withRouter(Login)