import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, BrowserRouter as Router } from 'react-router-dom';

import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';
import * as userStateActions from './store/session';

function App () {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userStateActions.Restore());
  }, [dispatch]);

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
}

export default App;
