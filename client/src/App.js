import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
//components
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './routing/PrivateRoute';
import RegisterMentor from './components/auth/RegisterMentor';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Students from './components/lists/Students';
import Mentors from './components/lists/Mentors';
import StudentProfile from './components/profile/StudentProfile';
import MentorProfile from './components/profile/MentorProfile';
import Meetings from './components/meetings/meetings';
// import Slots from './components/meetings/Slots';
import SlotForm from './components/profile-forms/SlotForm';
import Home from './components/Home/Home';
import Nav from './components/layout/Nav';
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <PrivateRoute exact path='/home' component={Home} />
          <section
            style={{
              backgroundImage: 'url(/background.png)',
              backgroundRepeat: 'no-repeat',
              height: '100vh',
              backgroundSize: 'cover',
            }}
          >
            <section className='container-2'>
              <Alert />
              <Switch>
                <Route exact path='/reg' component={Nav} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
                <Route
                  exact
                  path='/registerMentor'
                  component={RegisterMentor}
                />

                <PrivateRoute exact path='/dashboard' component={Dashboard} />
                <PrivateRoute
                  exact
                  path='/create-profile'
                  component={CreateProfile}
                />
                <PrivateRoute
                  exact
                  path='/edit-profile'
                  component={EditProfile}
                />
                <PrivateRoute
                  exact
                  path='/add-experience'
                  component={AddExperience}
                />
                <PrivateRoute
                  exact
                  path='/add-education'
                  component={AddEducation}
                />
                <PrivateRoute exact path='/students' component={Students} />
                <PrivateRoute exact path='/mentors' component={Mentors} />
                <PrivateRoute
                  exact
                  path='/student-profile/:id'
                  component={StudentProfile}
                />
                <PrivateRoute
                  exact
                  path='/mentor-profile/:id'
                  component={MentorProfile}
                />
                <PrivateRoute exact path='/meetings' component={Meetings} />
                <PrivateRoute exact path='/add-slots' component={SlotForm} />
              </Switch>
            </section>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
