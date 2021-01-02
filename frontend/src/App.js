import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Page from './components/UniquePage';
import { Restore } from './store/session';

const masterTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#01579b'
    },
    secondary: {
      main: '#1a237e'
    }
  }
});

export default function App () {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Restore());
  }, [dispatch]);

  return (
    <>
      <ThemeProvider theme={masterTheme}>
        <Navigation />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/login'>
            <LoginFormPage />
          </Route>
          <Route path='/signup'>
            <SignupFormPage />
          </Route>
          <Route path='/:page'>
            <Page />
          </Route>
        </Switch>
      </ThemeProvider>
    </>
  );
}
