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
  Image,
  Divider,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link as RouteLink } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import KortGo from '../assets/images/kortgo-logo.svg'
import { ColorModeSwitcher } from '../ColorModeSwitcher';

export default function Login(props) {
  const toast = useToast();
  const navigate = useNavigate();
  const loginURL = `${process.env.REACT_APP_API_URL}/users/login`;

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const onChange = e => {
    const value = e.target.value;
    setCredentials({
      ...credentials,
      [e.target.name]: value,
    });
  };

  const [rememberMe, setRememberMe] = useState(false);

  const onRemember = e => {
    setRememberMe(!rememberMe);
    console.log(rememberMe);
  };

  const login = e => {
    //setLoginBtnState("is-loading")
    e.preventDefault();
    axios
      .post(loginURL, credentials)
      .then(response => {
        if (response.data.token) {
          props.setLogin(response.data);
          //console.log(response.data)
          if (rememberMe) {
            localStorage.setItem('waterfordToken', response.data.token);
            localStorage.setItem('waterfordUserId', response.data.id);
            localStorage.setItem(
              'waterfordFirstName',
              response.data.name_first
            );
            localStorage.setItem('waterfordLastName', response.data.name_last);
          }
          setCredentials({ email: '', password: '' });

          if (response.data.role == 'user') {
            navigate('/');
          } else if (response.data.role == 'admin') {
            navigate('/admin');
          } else if (response.data.role == 'guard') {
            navigate('/guard')
          }
          
        }
      })
      .catch(error => {
        console.log(error);
        toast({
          title: 'Error',
          description: error.response.data.message,
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
      });
  };

  return (
    <Flex
      minH={'100vh'}
      align={'flex-start'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={8} px={6}>
      
        <Stack align={'center'}>
            <Image src={KortGo} px={10}/>
            
            
            <Divider></Divider>
          
          <Heading fontSize={'2xl'} textAlign='center'>Log in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'} textAlign='center'>
            Don't have an account?{' '}
            <RouteLink to={'/register'}>
              <Link color={'blue.400'}>Click here to register</Link>
            </RouteLink>
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
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                required
                onChange={onChange}
                value={credentials.email}
                name="email"
                placeholder="example@email.com"
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                required
                onChange={onChange}
                value={credentials.password}
                name="password"
                type="password"
                placeholder="*********"
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}
              >
                <Checkbox onChange={onRemember}>Remember me</Checkbox>
                <Link color={'blue.400'}>Forgot password?</Link>
              </Stack>
              <Button
                onClick={login}
                
                size="lg"
                colorScheme={'whatsapp'}
                shadow='md'
                
              >
                Sign in
              </Button>
              
            </Stack>
          </Stack>

        </Box>
        <Flex alignItems={'center'} gap={2} justifyContent={'center'}><ColorModeSwitcher/><Text alignItems={'center'}>Light/Dark mode</Text></Flex>
      </Stack>
      
    </Flex>
  );
}
