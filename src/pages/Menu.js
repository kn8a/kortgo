import React from 'react';
import {
  Flex,
  Box,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link as RouteLink } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {
  InfoOutlineIcon,
  CalendarIcon,
  EditIcon,
  LockIcon,
} from '@chakra-ui/icons';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

function Menu(props) {
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
        navigate('/admin');
      }
      else if (response.data.role == 'guard') {
        navigate('/guard');
      }
      else if (response.data.role == 'user') {
        return
      }
      else {
        console.log('authentication error')
        props.setLogin({});
        props.logout()
        navigate('/login');
      }
    })
  },[]);

  return (
    <Flex
      minH={'100vh'}
      align={'flex-start'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={4} mx={'auto'} maxW={'lg'} py={4} px={4} w="full">
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>
            Welcome {`${props.loggedIn.name_first}`}
          </Heading>
          <Text fontSize={'lg'}>
            {`Your account balance is ${props.loggedIn.balance}`}
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack
            spacing={6}
            alignContent="center"
            alignItems={'center'}
            width="full"
          >
            <RouteLink to={'/book'}>
              <Button
                colorScheme={'green'}
                width="full"
                leftIcon={<EditIcon />}
                size={'lg'}
              >
                New booking
              </Button>
            </RouteLink>
            <RouteLink to={'/Bookings'}>
              <Button
                colorScheme={'blue'}
                width="full"
                leftIcon={<CalendarIcon />}
              >
                My bookings
              </Button>
            </RouteLink>
            <RouteLink to={'/account'}>
              <Button
                colorScheme={'blue'}
                leftIcon={<InfoOutlineIcon />}
                width="full"
              >
                Manage account
              </Button>
            </RouteLink>
            <RouteLink to={'/howto'}>
              <Button
                colorScheme={'blue'}
                leftIcon={<InfoOutlineIcon />}
                width="full"
              >
                How to use?
              </Button>
            </RouteLink>
            <Flex gap={4} justifyContent="center">
              <ColorModeSwitcher />
              <Button
                onClick={() => {
                  props.setLogin({});
                  props.logout();
                  navigate('/login')
                }}
                leftIcon={<LockIcon />}
                colorScheme={'red'}
              >
                Logout
              </Button>
            </Flex>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default Menu;
