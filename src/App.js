import React from 'react';
import MainPage from './pages/main-page/main-page.component';
import AddResource from './components/add-resource-form/add-resource.component';
import LoginPage from './pages/login-page/login-page.component'; 
import RegisterPage from './pages/register-page/register-page.component';
import ProfilePage from './pages/profile-page/profile-page.component';
import NavBar from './components/navigation/navbar/navbar.component';
import { AdminResourcePage } from './pages/admin-resource-page.component';
import { ResourcesPage } from './pages/resources-page.component';
import { AboutPage } from './pages/about-page.component'
import { Route, withRouter, Switch } from 'react-router-dom' 
import './App.css';

function App(props) {
  const [isAuth, setIsAuth] = React.useState(false);
  const [token, setToken] = React.useState(null);
  const [userId, setUserId] = React.useState(null);
  const [load, setLoad] = React.useState(false)

  const handleLoad = () => {
    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');
    if (!token || !expiryDate) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      handleSubmitLogout();
      return;
    }
    setIsAuth(true);
    const userId = localStorage.getItem('userId');
    setUserId(userId);
    setToken(token);
  }

  React.useEffect(() => {
    handleLoad()
    setLoad(true)
    }, [])

  const handleSubmitLogout = () => {
    setIsAuth(false);
    setToken(null);
    setUserId(null);
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
    props.history.push('/login')
    window.location.reload(false);
}

  const handleLogin = (e, authData) => {
    e.preventDefault()
    const data = {
      username: authData.username,
      password: authData.password
  }
    fetch('/login', {
        method: "POST", 
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .then((response) => {
            if (response.msg === 'no user') {
                alert("You're not a user! That's all good, come register!")
                props.history.push('/register');
                return;
            } else if (response.msg === 'no match') {
                alert("Username and Password didn't match. Try again!")
                return;
            } else if (response.msg === 'success') {
                setToken(response.token);
                setUserId(response.userId);
                setIsAuth(true);
                alert('logged in successfully!')
            }
            localStorage.setItem('token', response.token);
            localStorage.setItem('userId', response.userId);
            const remainingMilliseconds = 60 * 60 * 1000;
            const expiryDate = new Date(
              new Date().getTime() + remainingMilliseconds
            );
            localStorage.setItem('expiryDate', expiryDate.toISOString());
            props.history.push('/profile');
            window.location.reload(false);
        })
        .catch(err => {
          console.log(err);
          setIsAuth(false);
        })
  }

  return (
    <React.Fragment>
      {load ? 
        <NavBar 
          logout={handleSubmitLogout} 
          admin={userId === process.env.REACT_APP_USER_ID ? true : false} 
          isAuth={isAuth}/> : 
          null}
      <div className="App">
          <Switch>
            <Route exact path='/' component={MainPage} />
            <Route exact path='/login' render={props => <LoginPage handleLogin = {handleLogin}/>} />
            <Route exact path='/register' component={RegisterPage} />
            <Route exact path='/resources' component={ResourcesPage} />
            <Route exact path='/about' component={AboutPage} />
            {isAuth ? <Route exact path='/edit-resource' component={AddResource} /> : null}
            {(isAuth && userId === process.env.REACT_APP_USER_ID) ? 
              <Route exact path="/admin-resources" component={AdminResourcePage} /> : 
              null}
            {isAuth ? <Route exact path ="/profile" render={() => <ProfilePage token={token}/>} /> : null}
            <Route path='*' render={() => <p>Sorry, there's nothing here!</p>} />
          </Switch>
      </div>
    </React.Fragment>
  );
}

export default withRouter(App);
