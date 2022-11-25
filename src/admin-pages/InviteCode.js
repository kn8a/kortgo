import React from 'react';
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
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link as RouteLink } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function InviteCode(props) {

  const navigate = useNavigate();


    useEffect(() => {
        if (!props.loggedIn.token) {
          navigate('/login');
        }
      },[]);

  const toast = useToast();
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
                  leftIcon={<FaArrowLeft/>}
                >
                  Back to menu
                </Button>
              </RouteLink>
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
                colorScheme='green'
                size="lg"
                
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
              
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default InviteCode;
