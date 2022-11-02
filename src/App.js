import React, { useEffect, useState } from 'react';
import Register from './pages/Register';
import Login from './pages/Login';
import Book from './pages/Book';
import Bookings from './pages/Bookings';
import Account from './pages/Account';
import Menu from './pages/Menu';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import Howto from './pages/Howto';
import axios from 'axios';

function App() {
  const balanceURL = `${process.env.REACT_APP_API_URL}/users/balance`;
  
  const [loggedIn, setLoggedIn] = useState({
    id: localStorage.getItem('waterfordUserId'),
    name_first: localStorage.getItem('waterfordFirstName'),
    name_last: localStorage.getItem('waterfordLastName'),
    token: localStorage.getItem('waterfordToken'),
  });

  useEffect(() => {
    updateBalance()
  }, []);

  const setLogin = credentials => {
    setLoggedIn(credentials);
    console.log(credentials);
  };

  const updateBalance = (amount) => {
    axios.get(balanceURL, {
      headers: { Authorization: `Bearer ${loggedIn.token}` }})
    .then(response => {
      setLoggedIn({...loggedIn, balance: response.data.balance.balance})
      console.log(response.data.balance.balance)
    })
  };

  const logout = () =>{
    if (localStorage.getItem('waterfordUserId')) {
      localStorage.removeItem('waterfordUserId')
      localStorage.removeItem('waterfordFirstName')
      localStorage.removeItem('waterfordLastName')
      localStorage.removeItem('waterfordToken')
    }
  }

  return (
    <>
      <ChakraProvider theme={theme}>
        {/* <ColorModeSwitcher justifySelf="flex-end" /> */}
        <Box>
          <Router>
            <Routes>
              <Route
                path="/"
                element={<Menu loggedIn={loggedIn} setLogin={setLogin} logout={logout} />}
              />
              <Route
                path="/login"
                element={<Login loggedIn={loggedIn} setLogin={setLogin} />}
              />
              <Route
                path="/howto"
                element={<Howto/>}
              />
              <Route
                path="/register"
                element={<Register loggedIn={loggedIn} />}
              />
              {/* <Route path='/' element={<Board />} /> */}
              <Route
                path="/account"
                element={<Account loggedIn={loggedIn} />}
              />
              <Route path="/book" element={<Book loggedIn={loggedIn} updateBalance={updateBalance}/>} />
              <Route
                path="/bookings"
                element={<Bookings loggedIn={loggedIn} updateBalance={updateBalance}/>}
              />
            </Routes>
          </Router>
        </Box>
      </ChakraProvider>
    </>
  );
}

export default App;
