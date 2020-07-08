import React from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import './App.css';

import MainPage from './pages/main-page/main-page.component';
import EditResourcePage from './pages/edit-resource/edit-resource-page.component';
import RegisterPage from './pages/register-page/register-page.component';
import ProfilePage from './pages/profile-page/profile-page.component';
import NavBar from './components/navigation/navbar/navbar.component';
import Detail from './components/detail/detail.component';
import { Footer } from './components/footer/footer.component';
import { ResetPage } from './pages/reset-page/reset-page.component';
import { AdminResourcePage } from './pages/admin-resources/admin-resource-page.component';
import { ResourcePage } from './pages/resource-page/resource-page.component';
import { AboutPage } from './pages/about-page/about-page.component';
import { ErrorPage } from './pages/error-page/error-page.component';


function App(props) {
  const [isAuth, setIsAuth] = React.useState(false);
  const [token, setToken] = React.useState(null);
  const [userId, setUserId] = React.useState(null);
  const [load, setLoad] = React.useState(false);

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
    localStorage.removeItem('name');
    props.history.push('/')
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
        if (response.message) {
          setIsAuth(false)
          alert(response.message)
          return;
        } else if (response.success) {
          setToken(response.token);
          setUserId(response.userId);
          setIsAuth(true);
          alert('logged in successfully!')
        }
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.userId);
        localStorage.setItem('name', response.name);
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
          isAuth={isAuth}
          handleLogin={handleLogin}
        /> :
        null}
      <div className="App">
        <Switch>
          <Route exact path='/' component={MainPage} />
          <Route exact path='/register' component={RegisterPage} />
          <Route exact path='/resources' component={ResourcePage} />
          <Route exact path='/about' component={AboutPage} />
          <Route exact path='/detail' component={Detail} />
          <Route exact path='/reset' component={ResetPage} />
          {isAuth ? <Route exact path='/edit-resource' component={EditResourcePage} /> : null}
          {(isAuth && userId === process.env.REACT_APP_USER_ID) ?
            <Route exact path="/admin-resources" component={AdminResourcePage} /> :
            null}
          {isAuth ? <Route exact path="/profile" render={() => <ProfilePage logout={handleSubmitLogout} token={token} />} /> : null}
          <Route path='*' component={ErrorPage} />
        </Switch>
      </div>
      {/* <Footer /> */}
    </React.Fragment>
  );
}

export default withRouter(App);
