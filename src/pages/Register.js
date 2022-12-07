import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
  FormHelperText,
} from '@chakra-ui/react';
import { useState } from 'react';
//import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Link as RouteLink } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false)
  const registerURL = `${process.env.REACT_APP_API_URL}/users/register`;

  const [registerInfo, setRegisterInfo] = useState({
    name_first: '',
    name_last: '',
    email: '',
    password: '',
    confirm_password: '',
    address: '',
  });

  const register = e => {
    setLoading(true)
    e.preventDefault();
    axios
      .post(registerURL, registerInfo)
      .then(response => {
        if (response.data.message == 'Profile created successfully') {
          toast({
            title: 'Account created.',
            description:
              'Your account has been created. please login with your credentials.',
            status: 'success',
            duration: 9000,
            isClosable: true,
          });

          setRegisterInfo({
            name_first: '',
            name_last: '',
            email: '',
            password: '',
            confirm_password: '',
            address: '',
          });
          setLoading(false)
          navigate('/login');
          
        }
      })
      .catch(error => {
        console.log(error);
        toast({
          title: 'Error creating account',
          description: error.response.data.message,
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
        setLoading(false)
      });
  };

  const onRegChange = e => {
    const value = e.target.value;
    setRegisterInfo({
      ...registerInfo,
      [e.target.name]: value,
    });
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Flex
      minH={'100vh'}
      align={'flex-start'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={4} mx={'auto'} maxW={'lg'} py={4} px={4} w="full">
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            To start using KortGo
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    required
                    onChange={onRegChange}
                    value={registerInfo.name_first}
                    name="name_first"
                    type="text"
                    placeholder="John"
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
                    name="name_last"
                    type="text"
                    placeholder="Smith"
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
                name="email"
                type="email"
                placeholder="example@email.com"
              />
              <FormHelperText>
                Used only to send important notifications about your bookings.
                No spam!
              </FormHelperText>
            </FormControl>
            <FormControl id="address" isRequired>
              <FormLabel>Condo / Apt Number</FormLabel>
              <Input
                required
                onChange={onRegChange}
                value={registerInfo.address}
                name="address"
                type="text"
                placeholder="88/123"
              />
            </FormControl>

            <FormControl id="invitation" isRequired>
              <FormLabel>Invitation code</FormLabel>
              <InputGroup>
                <Input
                  type={'text'}
                  required
                  onChange={onRegChange}
                  value={registerInfo.invitation}
                  name="invitation"
                />
              </InputGroup>
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  name="password"
                  required
                  onChange={onRegChange}
                  value={registerInfo.password}
                  type={showPassword ? 'text' : 'password'}
                />
              </InputGroup>
              <FormHelperText>
                Must be at least 8 characters.
              </FormHelperText>
            </FormControl>

            <FormControl id="confirm_password" isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup>
                <Input
                  required
                  onChange={onRegChange}
                  value={registerInfo.confirm_password}
                  name="confirm_password"
                  type={showPassword ? 'text' : 'password'}
                />
                
              </InputGroup>
              
            </FormControl>

            <Stack spacing={10} pt={2}>
              <Button
                onClick={register}
                loadingText="Registering..."
                isLoading={loading}
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                <RouteLink to={'/login'}>
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
