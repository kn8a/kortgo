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
  theme,
} from '@chakra-ui/react';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Howto from './pages/Howto';
import axios from 'axios';
import AdminMenu from './admin-pages/AdminMenu';
import InviteCode from './admin-pages/InviteCode';
import TopUp from './admin-pages/TopUp';
import PastBookings from './admin-pages/PastBookings';
import FutureBookings from './admin-pages/FutureBookings';
import ManageUsers from './admin-pages/ManageUsers';
import AddUser from './admin-pages/AddUser';
import ViewLogs from './admin-pages/ViewLogs';
import GuardPage from './pages/GuardPage';

function App() {
  const balanceURL = `${process.env.REACT_APP_API_URL}/users/balance`;

  const [loggedIn, setLoggedIn] = useState({
    id: localStorage.getItem('waterfordUserId'),
    name_first: localStorage.getItem('waterfordFirstName'),
    name_last: localStorage.getItem('waterfordLastName'),
    token: localStorage.getItem('waterfordToken'),
  });

  useEffect(() => {
    updateBalance();
  }, []);

  const setLogin = credentials => {
    setLoggedIn(credentials);
    console.log(credentials);
  };

  const updateBalance = amount => {
    axios
      .get(balanceURL, {
        headers: { Authorization: `Bearer ${loggedIn.token}` },
      })
      .then(response => {
        setLoggedIn({ ...loggedIn, balance: response.data.balance.balance });
        console.log(response.data.balance.balance);
      });
  };

  const logout = () => {
    if (localStorage.getItem('waterfordUserId')) {
      localStorage.removeItem('waterfordUserId');
      localStorage.removeItem('waterfordFirstName');
      localStorage.removeItem('waterfordLastName');
      localStorage.removeItem('waterfordToken');
    }
  };

  return (
    <>
      <ChakraProvider theme={theme}>
        <Box>
          <Router>
            <Routes>
              <Route
                path="/"
                element={
                  <Menu
                    loggedIn={loggedIn}
                    setLogin={setLogin}
                    logout={logout}
                  />
                }
              />
              <Route
                path="/login"
                element={<Login loggedIn={loggedIn} setLogin={setLogin} />}
              />
              <Route path="/howto" element={<Howto />} />
              <Route
                path="/register"
                element={<Register loggedIn={loggedIn} />}
              />
              {/* <Route path='/' element={<Board />} /> */}
              <Route
                path="/account"
                element={<Account loggedIn={loggedIn} />}
              />
              <Route
                path="/book"
                element={
                  <Book loggedIn={loggedIn} updateBalance={updateBalance} />
                }
              />
              <Route
                path="/bookings"
                element={
                  <Bookings loggedIn={loggedIn} updateBalance={updateBalance} />
                }
              />
              <Route
                path="/admin"
                element={
                  <AdminMenu
                    loggedIn={loggedIn}
                    setLogin={setLogin}
                    logout={logout}
                  />
                }
              />
              <Route
                path="/admin/invite"
                element={<InviteCode loggedIn={loggedIn} setLogin={setLogin} />}
              />
              <Route
                path="/admin/topup"
                element={<TopUp loggedIn={loggedIn} setLogin={setLogin} />}
              />
              <Route
                path="/admin/past-bookings"
                element={
                  <PastBookings loggedIn={loggedIn} setLogin={setLogin} />
                }
              />
              <Route
                path="/admin/future-bookings"
                element={
                  <FutureBookings loggedIn={loggedIn} setLogin={setLogin} />
                }
              />
              <Route
                path="/admin/add-user"
                element={<AddUser loggedIn={loggedIn} setLogin={setLogin} />}
              />
              <Route
                path="/admin/manage-users"
                element={
                  <ManageUsers loggedIn={loggedIn} setLogin={setLogin} />
                }
              />
              <Route
                path="/admin/logs"
                element={<ViewLogs loggedIn={loggedIn} setLogin={setLogin} />}
              />
              <Route
                path="/guard"
                element={
                  <GuardPage
                    loggedIn={loggedIn}
                    setLogin={setLogin}
                    logout={logout}
                  />
                }
              />
            </Routes>
          </Router>
        </Box>
      </ChakraProvider>
    </>
  );
}

export default App;
