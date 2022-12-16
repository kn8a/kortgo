import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Stack,
  Heading,
  Flex,
  Button,
  Divider,
  useToast,
} from '@chakra-ui/react';
import { Link as RouteLink } from 'react-router-dom';
import BookingAdmin from './components/BookingAdmin';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

function FutureBookings(props) {
  const toast = useToast();
  const navigate = useNavigate();
  const futureBookingsURL = `${process.env.REACT_APP_API_URL}/admin/bookings/future`;
  const [bookings, setBookings] = useState([]);

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

  useEffect(() => {
    axios
      .get(futureBookingsURL, {
        headers: { Authorization: `Bearer ${props.loggedIn.token}` },
      })
      .then(response => {
        if (response.data.bookings.length == 0) {
          navigate('/admin');
          toast({
            title: 'No bookings',
            description: 'No future bookings',
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
      .get(futureBookingsURL, {
        headers: { Authorization: `Bearer ${props.loggedIn.token}` },
      })
      .then(response => {
        if (response.data.bookings.length == 0) {
          navigate('/admin');
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
      align={'flex-start'}
      justify={'space-between'}
      flexDirection={'column'}
    >
      <Stack spacing={4} mx={'auto'} maxW={'lg'} py={4} px={4} w="full">
        <RouteLink to={'/admin'}>
          <Button size="sm" colorScheme={'blue'} leftIcon={<FaArrowLeft />}>
            Back to menu
          </Button>
        </RouteLink>
        <Stack align={'center'}>
          <Heading fontSize={'3xl'}>Upcoming bookings</Heading>
          <Divider />
        </Stack>
        {bookings.map(booking => {
          return (
            <Flex key={booking.date}>
              <BookingAdmin
                booking={booking}
                updateBookings={updateBookings}
                loggedIn={props.loggedIn}
                updateBalance={props.updateBalance}
              />
            </Flex>
          );
        })}
      </Stack>
    </Flex>
  );
}

export default FutureBookings;
