import React, { useEffect } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
  Select,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link as RouteLink } from 'react-router-dom';
import axios from 'axios';
import User from './components/User';

function ManageUsers(props) {
  const toast = useToast();

  const getUsersURL = `${process.env.REACT_APP_API_URL}/admin/users-manage`;
  const topUpURL = `${process.env.REACT_APP_API_URL}/admin/top-up`;

  const [amount, setAmount] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [receipt, setReceipt] = useState('');

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
  }

  const topUp = () => {
    const topUpDetails = {
      userId: selectedUser,
      amount: amount,
      receipt: receipt,
    };
    console.log(topUpDetails);
    axios
      .post(topUpURL, topUpDetails, {
        headers: { Authorization: `Bearer ${props.loggedIn.token}` },
      })
      .then(response => {
        toast({
          title: 'Top-up complete',
          description: response.data.message,
          status: 'success',
          duration: 4000,
          isClosable: true,
        });
        setAmount('');
        setReceipt('');
      })
      .catch(err => {
        toast({
          title: 'Error generating code',
          description: err.response.data.message,
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
      });
  };

  const onUserChange = e => {
    const value = e.target.value;
    console.log(value);
    setSelectedUser(value);
  };

  const onAmountChange = e => {
    const value = e.target.value;
    setAmount(value);
  };

  const onRecieptChange = e => {
    const value = e.target.value;
    setReceipt(value);
  };

  return (
    <Flex
      minH={'100vh'}
      align={'flex-start'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      
      <Stack spacing={4} mx={'auto'} maxW={'lg'} py={4} px={4} w='full'>
      <RouteLink to={'/admin'}>
                <Button
                  size="sm"
                  colorScheme={'blue'}
                >
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
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          w='full'
          p={4}
        >
          <Stack gap={2}>
            {users.map(user=>{
              return(
                <div><User user={user} updateUsers={updateUsers} loggedIn={props.loggedIn}/></div>
              )
            })}
            {/* <FormControl id="user">
              <FormLabel>User</FormLabel>
              <Select placeholder="Select user" onChange={onUserChange}>
                {users.map(user => {
                  return (
                    <option
                      value={user._id}
                      key={user._id}
                    >{`${user.address}-${user.name_first}-${user.balance}`}</option>
                  );
                })}
              </Select>
            </FormControl> */}

            

            

            
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default ManageUsers