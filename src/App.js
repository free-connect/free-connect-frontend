import React from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import './App.css';

import MainPage from './pages/main-page/main-page.component';
import EditResourcePage from './pages/edit-resource/edit-resource-page.component';
import RegisterPage from './pages/register-page/register-page.component';
import ProfilePage from './pages/profile-page/profile-page.component';
import NavBar from './components/navigation/navbar/navbar.component';
import ResourceDetail from './components/resources/resource-detail/resource-detail.component';
import ResetPage from './pages/reset-page/reset-page.component';
import NewPwPage from './pages/new-pw-page/newPw-page.component';
import { AdminResourcePage } from './pages/admin-resources/admin-resource-page.component';
import { ResourcePage } from './pages/resource-page/resource-page.component';
import { AboutPage } from './pages/about-page/about-page.component';
import { ErrorPage } from './pages/error-page/error-page.component';
import { ContactPage } from './pages/contact-page/contact-page.component';
import { Footer } from './components/footer/footer.component';
import { ConfirmationDialog } from './components/new-alert-box/new-alert-box.component';
import { AlertBoxProvider } from './util/context/alertContext';

const App = (props) => {
  const [isAuth, setIsAuth] = React.useState(false);
  const [userId, setUserId] = React.useState(null);
  const [load, setLoad] = React.useState(false);

  const handleLoad = () => {
    setLoad(true)
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
  }

  React.useEffect(() => {
    handleLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmitLogout = () => {
    setIsAuth(false);
    setUserId(null);
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('name');
    props.history.push('/')
    window.location.reload(false);
  }

  const handleLogin = (e, authData) => {
    e.preventDefault();
    const data = {
      username: authData.username,
      password: authData.password
    }
    fetch(process.env.REACT_APP_LOCATION + '/login', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then((response) => {
        if (response.message) {
          setIsAuth(false);
          alert(response.message);
          return;
        } else if (response.success) {
          setUserId(response.userId);
          setIsAuth(true);
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
        return true;
      })
      .catch(err => {
        console.log(err);
        setIsAuth(false);
      })
  }

  return (
    <React.Fragment>
      <AlertBoxProvider>
        {load ?
          <React.Fragment>
            <NavBar
              logout={handleSubmitLogout}
              admin={userId === process.env.REACT_APP_USER_ID ? true : false}
              isAuth={isAuth}
              handleLogin={handleLogin}
            />
            <div className='nav-banner'></div>
          </React.Fragment>
          :
          null}
        <div className="App">
          <React.Fragment>
            <ConfirmationDialog open={false} />
            <Switch>
              <Route exact path='/' component={MainPage} />
              <Route exact path='/register' render={() => <RegisterPage handleLogin={handleLogin} />} />
              <Route exact path='/resources' component={ResourcePage} />
              <Route exact path='/about' component={AboutPage} />
              <Route exact path='/detail' component={ResourceDetail} />
              <Route exact path='/reset/:resetId' component={NewPwPage} />
              <Route exact path='/reset' component={ResetPage} />
              <Route exact path='/contact' component={ContactPage} />
              {isAuth ? <Route exact path='/edit-resource' component={EditResourcePage} /> : null}
              {(isAuth && userId === process.env.REACT_APP_USER_ID) ?
                <Route exact path="/admin-resources" component={AdminResourcePage} /> :
                null}
              {isAuth ? <Route exact path="/profile" render={() => <ProfilePage logout={handleSubmitLogout} />} /> : null}
              <Route path='*' component={ErrorPage} />
            </Switch>
            <Footer />
          </React.Fragment>
        </div>
      </AlertBoxProvider>
    </React.Fragment>
  );
}

export default withRouter(App);
