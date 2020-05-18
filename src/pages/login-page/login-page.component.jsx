import React from 'react';
import { withRouter } from 'react-router-dom';
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
        </div>
    )
}

export default withRouter(LoginPage)