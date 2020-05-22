import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Form } from '../../components/form/form.component';

const LoginPage = (props) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const data = {
        username: username, 
        password: password
    }

    return(
        <div>
            <form className='login-form' onSubmit={(e) => props.handleLogin(e, data)}>
                <Form 
                    title='username' 
                    label="Username" 
                    value={username} 
                    type="text" 
                    changeFunction = {setUsername}/>
                <Form 
                    title='password' 
                    label="Password" 
                    value={password} 
                    type="password" 
                    changeFunction = {setPassword}/>
                <button type='submit'>Submit</button>
            </form>
            <Link to='/register'>Not a member? Register here!</Link>
        </div>
    )
}

export default withRouter(LoginPage)