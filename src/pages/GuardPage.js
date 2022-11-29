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
import GuardBooking from '../components/GuardBooking';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCaretLeft, } from 'react-icons/fa';
import { LockIcon, RepeatIcon } from '@chakra-ui/icons';

function GuardPage(props) {
    const toast = useToast();
  const navigate = useNavigate();
  const BookingsURL = `${process.env.REACT_APP_API_URL}/guard/bookings`;
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (!props.loggedIn.token) {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    axios
      .get(BookingsURL, {
        headers: { Authorization: `Bearer ${props.loggedIn.token}` },
      })
      .then(response => {
        console.log(response.data.bookings)
        if (response.data.bookings.length == 0) {
          
          toast({
            title: 'No bookings',
            description: 'There are no bookings for today',
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
      .get(BookingsURL, {
        headers: { Authorization: `Bearer ${props.loggedIn.token}` },
      })
      .then(response => {
        console.log(response.data.bookings)
        if (response.data.bookings.length == 0) {
          
          toast({
            title: 'No bookings',
            description: "There are no bookings for today",
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

//   if (bookings.length == 0) {
//     return <Loader />;
//   }

  return (
    <Flex
      minH={'100vh'}
      align={'flex-start'}
      justify={'space-between'}
      flexDirection={'column'}
    >
      <Stack spacing={4} mx={'auto'} maxW={'lg'} py={4} px={4} w='full'>
        <Flex justifyContent={'space-evenly'}>
        
                <Button
                  size="lg"
                  colorScheme={'blue'}
                  leftIcon={<RepeatIcon/>}
                  onClick={updateBookings}
                >
                  Refresh
                </Button>

                <Button
                  size="lg"
                  colorScheme={'red'}
                  leftIcon={<LockIcon/>}
                  onClick={() => {props.setLogin({}); props.logout()}}
                >
                  Logout
                </Button>
              
        </Flex>
      
        <Stack align={'center'}>
          <Heading fontSize={'3xl'}>Today's bookings</Heading>
          <Divider />
          {/* <Text fontSize={'lg'} >
              {`Your account balance is ${props.loggedIn.balance}`}
            </Text> */}
        </Stack>
        {bookings.map(booking => {
          return (
            <Flex key={booking.date}>
              <GuardBooking
                booking={booking}
                updateBookings={updateBookings}
                loggedIn={props.loggedIn}
              />
            </Flex>
          );
        })}
      </Stack>
      
    </Flex>
  );
}

export default GuardPage