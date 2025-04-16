import './App.css'
import CreateAccount from './pages/CreateAccount'
import ConnectAccount from './pages/ConnectAccount';
import ForgotPassword from './pages/ForgotPassword';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/createaccount" element={<CreateAccount />} />
          <Route path="/connectaccount" element={<ConnectAccount />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
