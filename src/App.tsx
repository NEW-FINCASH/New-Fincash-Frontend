import './App.css'
import CreateAccount from './pages/CreateAccount'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/createaccount" element={<CreateAccount />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
