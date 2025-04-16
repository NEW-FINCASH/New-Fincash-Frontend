import './App.css'
import CreateAccount from './pages/CreateAccount'
import ConnectAccount from './pages/ConnectAccount';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/createaccount" element={<CreateAccount />} />
          <Route path="/connectaccount" element={<ConnectAccount />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
