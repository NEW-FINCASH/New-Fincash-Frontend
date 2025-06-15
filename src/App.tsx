import './App.css'
import CreateAccount from './pages/CreateAccount'
import ConnectAccount from './pages/ConnectAccount';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Account from './pages/Account';
import Welcome from './pages/Welcome';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/createaccount" element={<CreateAccount />} />
          <Route path="/connectaccount" element={<ConnectAccount />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/home" element={<Home />} />
          <Route path="/account" element={<Account />} />
          <Route path="/" element={<Welcome />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
