import './App.css';
import { useState } from 'react';
import {Routes,Route} from 'react-router-dom';
import Loginpages from './components/Loginpages';
import AadharPage from './components/AadharPage';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [isAdmin, setAdmin] = useState(false);
  const navigate = useNavigate()

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post('https://arun.test.ppm.wtf/login', { email, password });
      console.log(response)
      if (response.data.token) {
        setLoggedIn(true);
        setAdmin(email === 'admin');
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('token', response.data.token);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleLogout = () => {
    setLoggedIn(false);
    setAdmin(false);
    localStorage.setItem('isLoggedIn', false);
    localStorage.removeItem('token');
    navigate('/')

  };
  return (
    <>
     <Routes>
        <Route path="/" element={<Loginpages handleLogin={handleLogin}/>}/>
        <Route path="/aadhar" element={<AadharPage isAdmin={isAdmin} handleLogout={handleLogout} />} />
      </Routes>
    </>
  );
}

export default App;
