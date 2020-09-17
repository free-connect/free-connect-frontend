import React from 'react';
import './newPw-page.styles.css';
import { withRouter } from 'react-router-dom'
import { Form } from '../../components/form/form.component';
import { Loading } from '../../components/loading-icon/loading.component';
import { ErrorPage } from '../error-page/error-page.component';
import { CustomButton } from '../../components/custom-button/custom-button.component';

const NewPwPage = (props) => {
    const [password, setPassword] = React.useState('');
    const [confPassword, setConfPassword] = React.useState('');
    const [loaded, setLoaded] = React.useState(false);
    const [user, setUser] = React.useState('');
    const [authed, setAuthed] = React.useState(false);

    const checkId = (id) => {
        fetch(process.env.REACT_APP_LOCATION + `/change-password?resetId=${id.toString()}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(res => {
                if (res.success) {
                    setAuthed(true);
                    setLoaded(true);
                    setUser(res.userId);
                } else {
                    setAuthed(false);
                    setLoaded(true);
                }
            })
            .catch(err => {
                setAuthed(false);
                setLoaded(true);
                console.log(err);
            })
    }

    const handleNewPw = (e) => {
        e.preventDefault();
        const data = {
            password: password,
            confPassword: confPassword,
            resetId: props.match.params.resetId,
            userId: user
        };
        if (password !== confPassword) {
            alert('Passwords need to match! Thanks :)');
            return;
        }
        fetch(process.env.REACT_APP_LOCATION + '/change-password', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(res => {
                if (res.success) {
                    alert('Password reset!')
                    props.history.push('/');
                } else {
                    alert(res.message)
                }
            })
            .catch(err => console.log(err))
    }

    React.useEffect(() => {
        checkId(props.match.params.resetId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <React.Fragment>
            {authed && loaded ?
                <div className='new-pw-form'>
                    <Form
                        title="New Password"
                        label={password}
                        type="password"
                        changeFunction={setPassword} />
                    <Form
                        title="Confirm Password"
                        label={confPassword}
                        type="password"
                        changeFunction={setConfPassword} />
                    <CustomButton
                        text="Change Password!"
                        handleClick={handleNewPw}
                    />
                </div> :
                !authed && loaded ?
                    <ErrorPage /> :
                    <Loading />
            }
        </React.Fragment>
    )
}

export default withRouter(NewPwPage)