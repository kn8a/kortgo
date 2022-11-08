import React, { useEffect } from 'react'
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

function TopUp(props) {
    const toast = useToast();
    const inviteURL = `${process.env.REACT_APP_API_URL}/admin/invite`;
    const getUsersURL = `${process.env.REACT_APP_API_URL}/admin/users-top-up`
    const topUpURL = `${process.env.REACT_APP_API_URL}/admin/top-up`
  

    const [amount, setAmount] = useState('')
    const [users,setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState({})
    const [receipt, setReceipt] = useState('')

    useEffect(()=> {
        axios.get(getUsersURL, {headers: { Authorization: `Bearer ${props.loggedIn.token}` }})
        .then(response => {
            console.log(response.data.users)
            setUsers(response.data.users)
        })
    },[])
  

    

    const topUp = () => {
        const topUpDetails = {
            user: selectedUser,
            amount: amount,
            receipt: receipt,
        }
        console.log(topUpDetails)
        axios
          .post(topUpURL, topUpDetails, {
            headers: { Authorization: `Bearer ${props.loggedIn.token}` },
          })
          .then(response => {
            console.log(response.data.code);
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
        console.log(value)
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
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Top-up</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              Add funds to user
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
            <Stack spacing={4}>
              

              <FormControl id="user">
                <FormLabel>User</FormLabel>
                <Select placeholder='Select user' onChange={onUserChange}>
                    {users.map(user => {
                        return(<option value={user._id} key={user._id}>{`${user.address}-${user.email}-${user.balance}`}</option>)
                    })}
                </Select>
              </FormControl>

              <FormControl id="amount">
                <FormLabel>Amount <small>(increments of 50)</small></FormLabel>
                <Input
                  type='number'
                  required
                  onChange={onAmountChange}
                  value={amount}
                  name="amount"
                  placeholder="Eg. 1000"
                />
              </FormControl>

              <FormControl id="receipt">
                <FormLabel>Receipt #</FormLabel>
                <Input
                  type='text'
                  required
                  onChange={onRecieptChange}
                  value={receipt}
                  name="amount"
                  placeholder="Enter receipt number"
                />
              </FormControl>
  
              <Stack spacing={10}>
                <Button
                  onClick={topUp}
                  bg={'blue.400'}
                  size="lg"
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                >
                  Top-up
                </Button>
                
                <RouteLink to={'/admin'}>
                  <Button
                    size="lg"
                    _hover={{
                      bg: 'blue.500',
                    }}
                  >
                    Back to menu
                  </Button>
                </RouteLink>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
}

export default TopUp