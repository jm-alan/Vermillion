import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

import LoginFormPage from './components/Form/Login';
import SignupFormPage from './components/Form/Signup';
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
      main: '#003066'
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
        <SimpleBar>
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
        </SimpleBar>
      </ThemeProvider>
    </>
  );
}
