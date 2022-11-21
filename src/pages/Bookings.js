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
import { FaArrowLeft, FaCaretLeft } from 'react-icons/fa';

function Bookings(props) {
  const toast = useToast();
  const navigate = useNavigate();
  const upcomingURL = `${process.env.REACT_APP_API_URL}/bookings/upcoming`;
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    if (!props.loggedIn.token) {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    axios
      .get(upcomingURL, {
        headers: { Authorization: `Bearer ${props.loggedIn.token}` },
      })
      .then(response => {
        //console.log(response.data.upcoming)
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
        setUpcoming(response.data.upcoming);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const updateUpcoming = () => {
    axios
      .get(upcomingURL, {
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
        setUpcoming(response.data.upcoming);
      })
      .catch(err => {
        console.log(err);
      });
  };

  if (upcoming.length == 0) {
    return <Loader />;
  }

  return (
    <Flex
      minH={'100vh'}
      align={'flex-start'}
      justify={'space-between'}
      flexDirection={'column'}
    >
      <Stack spacing={4} mx={'auto'} maxW={'lg'} py={4} px={4} w='full'>
      <RouteLink to={'/'}>
                <Button
                  size="sm"
                  colorScheme={'blue'}
                  leftIcon={<FaArrowLeft/>}
                >
                  Back to menu
                </Button>
              </RouteLink>
        <Stack align={'center'}>
          <Heading fontSize={'3xl'}>Upcoming bookings</Heading>
          <Divider />
          {/* <Text fontSize={'lg'} >
            {`Your account balance is ${props.loggedIn.balance}`}
          </Text> */}
        </Stack>
        {upcoming.map(booking => {
          return (
            <Flex key={booking.date}>
              <Booking
                booking={booking}
                updateUpcoming={updateUpcoming}
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

export default Bookings;
