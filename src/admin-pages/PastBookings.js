import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Stack,
  Heading,
  Flex,
  Box,
  Button,
  Text,
  useColorModeValue,
  Divider,
  useToast,
} from '@chakra-ui/react';
import { Link as RouteLink } from 'react-router-dom';
import Booking from '../components/Booking';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';

function PastBookings(props) {
    const toast = useToast();
  const navigate = useNavigate();
  const pastBookingsURL = `${process.env.REACT_APP_API_URL}/admin/bookings/past`;
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (!props.loggedIn.token) {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    axios
      .get(pastBookingsURL, {
        headers: { Authorization: `Bearer ${props.loggedIn.token}` },
      })
      .then(response => {
        //console.log(response.data.upcoming)
        if (response.data.bookings.length == 0) {
          navigate('/');
          toast({
            title: 'No bookings',
            description: "No confirmed bookings in the past 30 days",
            status: 'warning',
            duration: 2000,
            isClosable: true,
          });
        }
        setBookings(response.data.bookings);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const updateBookings = () => {
    axios
      .get(pastBookingsURL, {
        headers: { Authorization: `Bearer ${props.loggedIn.token}` },
      })
      .then(response => {
        if (response.data.upcoming.length == 0) {
          navigate('/');
          toast({
            title: 'No bookings',
            description: "You don't have any upcoming bookings",
            status: 'warning',
            duration: 2000,
            isClosable: true,

          });
        }
        setBookings(response.data.bookings);
      })
      .catch(err => {
        console.log(err);
      });
  };

  if (bookings.length == 0) {
    return <Loader />;
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'space-between'}
      flexDirection={'column'}
    >
      <Stack spacing={6} mx={'auto'} w='auto' py={12} px={2}>
        <Stack align={'center'}>
          <Heading fontSize={'3xl'}>Upcoming bookings</Heading>
          <Divider />
          {/* <Text fontSize={'lg'} >
            {`Your account balance is ${props.loggedIn.balance}`}
          </Text> */}
        </Stack>
        {bookings.map(booking => {
          return (
            <Flex key={booking.date}>
              <Booking
                booking={booking}
                updateUpcoming={updateBookings}
                loggedIn={props.loggedIn}
                updateBalance={props.updateBalance}
              />
            </Flex>
          );
        })}

        
      </Stack>
      <Flex pb={4} w='auto'>
      <RouteLink to={'/'}>
          <Button colorScheme={'blue'} width="full" size={'lg'}>
            Back to menu
          </Button>
        </RouteLink>
      </Flex>
      
    </Flex>
  );
}

export default PastBookings