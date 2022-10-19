import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    useToast
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
  import axios from 'axios';
  import { useNavigate } from 'react-router';
  import { Link as RouteLink } from 'react-router-dom';
  
  export default function Register() {

    const navigate = useNavigate()
    const toast = useToast()

    const registerURL = `${process.env.REACT_APP_API_URL}/users/register`

    const [registerInfo, setRegisterInfo] = useState({
      name_first: "",
      name_last: "",
      email: "",
      password: "",
      confirm_password: "",
      address: ""
    })

    const register = (e) => {
      // setRegBtnState("is-loading")
      e.preventDefault()
      //console.log(registerInfo)
      axios
        .post(registerURL, registerInfo)
        .then((response) => {
          //console.log(response)
          if (response.data.message == "Profile created successfully") {
            toast({
              title: 'Account created.',
              description: "Account submitted for approval, we will notify you once approved.",
              status: 'success',
              duration: 9000,
              isClosable: true,
            })
            // toast.success(`${response.data.message}. Please login to continue`)
            // setRegBtnState("")
            setRegisterInfo({
              name_first: "",
              name_last: "",
              email: "",
              password: "",
              confirm_password: "",
              address: ""
            })
            // toggleRegModal()
          }
        })
        .catch((error) => {
          console.log(error)
          toast({
            title: "Error creating account",
            description: error.response.data.message,
              status: 'error',
              duration: 4000,
              isClosable: true,
          })
          // toast.error(error.response.data.message)
          // setRegBtnState("")
        })
    }

    const onRegChange = (e) => {
      const value = e.target.value
      setRegisterInfo({
        ...registerInfo,
        [e.target.name]: value,
      })
    }


    const [showPassword, setShowPassword] = useState(false);

    function validateAddress(input) {
      let regex = /\d\d\/\d\d\d/i;
      return regex.test(input);
    }
  
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Sign up
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              To start using the booking system
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input 
                    required
                    onChange={onRegChange}
                    value={registerInfo.name_first}
                    name='name_first'
                    type='text'
                    placeholder='John'
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName" isRequired>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                    required
                    onChange={onRegChange}
                    value={registerInfo.name_last}
                    name='name_last'
                    type='text'
                    placeholder='Smith'
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input 
                required
                onChange={onRegChange}
                value={registerInfo.email}
                name='email'
                type='email'
                placeholder='example@email.com'
                />
              </FormControl>
              <FormControl id="address" isRequired>
                <FormLabel>Condo / Apt Number</FormLabel>
                <Input 
                required
                onChange={onRegChange}
                value={registerInfo.address}
                name='address'
                type='text'
                placeholder='88/123'
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input 
                  name='password' 
                  required
                  onChange={onRegChange}
                  value={registerInfo.password}
                  
                  type={showPassword ? 'text' : 'password'} />
                  {/* <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement> */}
                </InputGroup>
              </FormControl>
              <FormControl id="confirm_password" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                  <Input 
                  required
                  onChange={onRegChange}
                  value={registerInfo.confirm_password}
                  name='confirm_password' type={showPassword ? 'text' : 'password'} />
                  {/* <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement> */}
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  onClick={register}
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}><RouteLink to={"/login"}>
                Already a user? <Link color={'blue.400'}>Login</Link>
                </RouteLink>
                  
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }
  