import React from 'react';
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
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  return (
    <>
      <ChakraProvider theme={theme}>
      {/* <ColorModeSwitcher justifySelf="flex-end" /> */}
      <Box>
        <Router >
        <Routes>
            <Route
              path='/'
              element={<Menu/>}
            />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            {/* <Route path='/' element={<Board />} /> */}
            <Route path='/account' element={<Account/>} />
            <Route path='/book' element={<Book/>} />
            <Route
              path='/booking'
              element={<Bookings />}
            />
          </Routes>


          
            


        </Router>  
        </Box>
      </ChakraProvider>
    </>
    
  );
}

export default App;
