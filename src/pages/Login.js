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
    useToast
  } from '@chakra-ui/react';
import { useState } from 'react';
import { Link as RouteLink } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
  
  export default function Login(props) {
    const toast = useToast()
    const navigate = useNavigate()
    const loginURL = `${process.env.REACT_APP_API_URL}/users/login`

    const [credentials, setCredentials] = useState({
      email: "",
      password: "",
    })

    const onChange = (e) => {
      const value = e.target.value
      setCredentials({
        ...credentials,
        [e.target.name]: value,
      })
    }

    const [rememberMe, setRememberMe] = useState(false)

    const onRemember = (e) => {
      setRememberMe(!rememberMe)
      console.log(rememberMe)
    }

    const login = (e) => {
      //setLoginBtnState("is-loading")
      e.preventDefault()
      axios
        .post(loginURL, credentials)
        .then((response) => {
          if (response.data.token) {
            props.setLogin(credentials)
            //console.log(response.data.token)
            // localStorage.setItem("palstalkToken", response.data.token)
            // localStorage.setItem("palstalkUserId", response.data.id)
            // localStorage.setItem("palstalkUserPic", response.data.profile_pic)
            // const userName =
            //   response.data.name_first + " " + response.data.name_last
            // localStorage.setItem("palstalkUserName", userName)
            setCredentials({ email: "", password: "" })
            //toast.success("Logged in")
            navigate("/")
          }
        })
        .catch((error) => {
          console.log(error)
          toast({
            title: 'Error',
            description: error.response.data.message,
            status: 'error',
            duration: 4000,
            isClosable: true,
          })
          // setLoginBtnState("")
          // toast.error(error.response.data.message)
        })
    }

    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign in to your account</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              Don't have an account? <RouteLink to={"/register"}><Link color={'blue.400'}>Click here to register</Link></RouteLink> 🎾
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input 
                type="email" 
                required
                onChange={onChange}
                value={credentials.email}
                name='email'
                placeholder='example@email.com'
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                required
                onChange={onChange}
                value={credentials.password}
                name='password'
                type='password'
                placeholder='*********'
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox onChange={onRemember}>Remember me</Checkbox>
                  <Link color={'blue.400'}>Forgot password?</Link>
                </Stack>
                <Button
                  onClick={login}
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }