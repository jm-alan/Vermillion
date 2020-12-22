import { BrowserRouter as Router } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
function App () {
  return (
    <Router path='/login'>
      <LoginFormPage />
    </Router>
  );
}

export default App;
