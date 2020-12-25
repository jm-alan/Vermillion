import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, BrowserRouter as Router } from 'react-router-dom';

import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';
import * as userStateActions from './store/session';
import AnonHomePage from './components/AnonHomePage';

function App () {
  const user = useSelector(({ session: { user } }) => user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userStateActions.Restore());
  }, [dispatch]);

  if (user) {
    return (
      <>
        <Navigation />
        <Switch>
          <Router path='/login'>
            <LoginFormPage />
          </Router>
          <Router path='/signup'>
            <SignupFormPage />
          </Router>
        </Switch>
      </>
    );
  } else {
    return (
      <AnonHomePage />
    )
    ;
  }
}

export default App;
