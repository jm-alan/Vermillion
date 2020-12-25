import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Page from './components/UniquePage';
import * as userStateActions from './store/session';

export default function App () {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userStateActions.Restore());
  }, [dispatch]);

  return (
    <>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/login'>
          <Navigation />
          <LoginFormPage />
        </Route>
        <Route path='/signup'>
          <Navigation />
          <SignupFormPage />
        </Route>
        <Route path='/:page'>
          <Page />
        </Route>
      </Switch>
    </>
  );
}
