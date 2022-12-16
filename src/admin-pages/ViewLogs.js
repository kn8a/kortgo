import React from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  useToast,
  Select,
} from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Link as RouteLink } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useEffect } from 'react';
import Log from './components/Log';

function ViewLogs(props) {
  const navigate = useNavigate();
  const toast = useToast();

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

  const [loading, setLoading] = useState(false)
  const [logs, setLogs] = useState([]);
  const [logsForm, setLogsForm] = useState({
    type: '',
    duration: '',
  });

  const fetchLogs = () => {
    setLoading(true)
    const logsURL = `${process.env.REACT_APP_API_URL}/admin/logs/${logsForm.type}/${logsForm.duration}`;
    axios
      .get(logsURL, {
        headers: { Authorization: `Bearer ${props.loggedIn.token}` },
      })
      .then(response => {
        setLogs(response.data.logs);
        console.log(response.data.logs);
        setLoading(false)
      });
      
  };

  const onFormChange = e => {
    const value = e.target.value;
    setLogsForm({
      ...logsForm,
      [e.target.name]: value,
    });
  };

  return (
    <Flex
      minH={'100vh'}
      align={'flex-start'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={4} mx={'auto'} maxW={'lg'} py={4} px={4} w="full">
        <RouteLink to={'/admin'}>
          <Button size="sm" colorScheme={'blue'} leftIcon={<FaArrowLeft />}>
            Back to menu
          </Button>
        </RouteLink>
        <Stack align={'center'}>
          <Heading fontSize={'2xl'} textAlign={'center'}>
            View logs
          </Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={4}
        >
          <Stack spacing={2}>
            <FormControl id="role" isRequired>
              <FormLabel fontSize={'sm'} fontWeight="bold">
                Log type
              </FormLabel>
              <Select
                name="type"
                placeholder="Select option"
                onChange={onFormChange}
              >
                <option value="booking">Booking</option>
                <option value="refund">Refund</option>
                <option value="topup">Top-up</option>
                <option value="registration">Registration</option>
                <option value="edit">Edit</option>
                <option value="other">Other</option>
                <option value="all">All</option>
              </Select>
            </FormControl>
            <FormControl id="duration" isRequired>
              <FormLabel fontSize={'sm'} fontWeight="bold">
                Duration
              </FormLabel>
              <Select
                name="duration"
                placeholder="Select option"
                onChange={onFormChange}
              >
                <option value="3">Past 3 Days</option>
                <option value="7">Past 7 Days</option>
                <option value="30">Past 30 Days</option>
                <option value="90">Past 3 Months</option>
                <option value="180">Past 6 Months</option>
                <option value="365">Past 1 Year</option>
                <option value="730">Past 2 years</option>
              </Select>
            </FormControl>

            <Stack spacing={10} pt={2}>
              <Button
                onClick={fetchLogs}
                loadingText="Loading..."
                isLoading={loading}
                size="md"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
              >
                Get logs
              </Button>
            </Stack>
          </Stack>
        </Box>
        <Flex flexDirection={'column'} gap={2} px={2}>
          {logs.map(log => {
            return (
              <div>
                <Log log={log} />
              </div>
            );
          })}
        </Flex>
      </Stack>
    </Flex>
  );
}

export default ViewLogs;
