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

function App() {
  useEffect(() => {}, []);

  const [loggedIn, setLoggedIn] = useState({
    id: localStorage.getItem('waterfordUserId'),
    name_first: localStorage.getItem('waterfordFirstName'),
    name_last: localStorage.getItem('waterfordLastName'),
    token: localStorage.getItem('waterfordToken'),
  });

  const setLogin = credentials => {
    setLoggedIn(credentials);
    console.log(credentials);
  };

  const updateBalance = () => {};

  return (
    <>
      <ChakraProvider theme={theme}>
        {/* <ColorModeSwitcher justifySelf="flex-end" /> */}
        <Box>
          <Router>
            <Routes>
              <Route
                path="/"
                element={<Menu loggedIn={loggedIn} setLogin={setLogin} />}
              />
              <Route
                path="/login"
                element={<Login loggedIn={loggedIn} setLogin={setLogin} />}
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
              <Route path="/book" element={<Book loggedIn={loggedIn} />} />
              <Route
                path="/bookings"
                element={<Bookings loggedIn={loggedIn} />}
              />
            </Routes>
          </Router>
        </Box>
      </ChakraProvider>
    </>
  );
}

export default App;
