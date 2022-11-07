import React from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link as RouteLink } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function InviteCode(props) {
  const toast = useToast();
  const navigate = useNavigate();
  const inviteURL = `${process.env.REACT_APP_API_URL}/admin/invite`;

  const [address, setAddress] = useState({ address: '' });
  const [code, setCode] = useState('');

  const onChange = e => {
    const value = e.target.value;
    setAddress({ address: value });
  };

  const generateCode = () => {
    axios
      .post(inviteURL, address, {
        headers: { Authorization: `Bearer ${props.loggedIn.token}` },
      })
      .then(response => {
        setCode(response.data.code);
      });
  };

  // const login = e => {
  //   //setLoginBtnState("is-loading")
  //   e.preventDefault();
  //   axios
  //     .post(loginURL, credentials)
  //     .then(response => {
  //       if (response.data.token) {
  //         props.setLogin(response.data);
  //         if (rememberMe) {
  //           localStorage.setItem('waterfordToken', response.data.token);
  //           localStorage.setItem('waterfordUserId', response.data.id);
  //           localStorage.setItem(
  //             'waterfordFirstName',
  //             response.data.name_first
  //           );
  //           localStorage.setItem('waterfordLastName', response.data.name_last);
  //         }
  //         setCredentials({ email: '', password: '' });
  //         navigate('/');
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       toast({
  //         title: 'Error',
  //         description: error.response.data.message,
  //         status: 'error',
  //         duration: 4000,
  //         isClosable: true,
  //       });
  //     });
  // };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Invitation code</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            Generate one-time registration code
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Address</FormLabel>
              <Input
                type="text"
                required
                onChange={onChange}
                value={address.address}
                name="address"
                placeholder="Eg. 77/777"
              />
            </FormControl>

            <Stack spacing={10}>
              <Button
                onClick={generateCode}
                bg={'blue.400'}
                size="lg"
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
              >
                Generate code
              </Button>
              <Flex>
                <Text>Invite Code</Text>
                <Input
                  textAlign={'center'}
                  readOnly
                  fontWeight={600}
                  value={code}
                  size={'lg'}
                  fontSize="x-large"
                ></Input>
              </Flex>
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

export default InviteCode;
