import React, { useEffect } from 'react';
import {
  Flex,
  Box,
  Stack,
  Button,
  Heading,
  Text,
  useToast,
} from '@chakra-ui/react';

import { useState } from 'react';
import { Link as RouteLink } from 'react-router-dom';
import axios from 'axios';
import User from './components/User';
import Loader from '../components/Loader';

import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function ManageUsers(props) {
  const navigate = useNavigate();

  const userCheck = `${process.env.REACT_APP_API_URL}/users/check`;

  useEffect(() => {
    if (!props.loggedIn.token) {
      navigate('/login');
    }
    axios.get(userCheck, {
      headers: { Authorization: `Bearer ${props.loggedIn.token}` },
    })
    .then(response => {
      if (response.data.role == 'admin') {
        return
      }
      else if (response.data.role == 'user') {
        navigate('/');
      }
      else if (response.data.role == 'guard') {
        navigate('/guard')
      }
      else {
        console.log('authentication error')
        props.setLogin({});
        props.logout()
        navigate('/login');
      }
    })
  },[]);

  const toast = useToast();

  const getUsersURL = `${process.env.REACT_APP_API_URL}/admin/users-manage`;

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(getUsersURL, {
        headers: { Authorization: `Bearer ${props.loggedIn.token}` },
      })
      .then(response => {
        console.log(response.data.users);
        setUsers(response.data.users);
      });
  }, []);

  const updateUsers = () => {
    axios
      .get(getUsersURL, {
        headers: { Authorization: `Bearer ${props.loggedIn.token}` },
      })
      .then(response => {
        console.log(response.data.users);
        setUsers(response.data.users);
      });
  };

  if (users.length == 0) {
    return <Loader />;
  }

  return (
    <Flex
      minH={'100vh'}
      align={'flex-start'}
      justify={'center'}
      bg="gray.50"
      _dark={{ bg: 'gray.800' }}
    >
      <Stack spacing={4} mx={'auto'} maxW={'lg'} py={4} px={4} w="full">
        <RouteLink to={'/admin'}>
          <Button size="sm" colorScheme={'blue'} leftIcon={<FaArrowLeft />}>
            Back to menu
          </Button>
        </RouteLink>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Manage users</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            Edit existing users
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg="white"
          _dark={{ bg: 'gray.700' }}
          boxShadow={'lg'}
          w="full"
          p={4}
        >
          <Stack gap={2}>
            {users.map(user => {
              return (
                <div key={user.id}>
                  <User
                    user={user}
                    updateUsers={updateUsers}
                    loggedIn={props.loggedIn}
                  />
                </div>
              );
            })}
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default ManageUsers;
