import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Stack, Heading, Flex, Box, Button, Text, useColorModeValue, Divider, } from '@chakra-ui/react'
import { Link as RouteLink } from 'react-router-dom';
import Booking from '../components/Booking';
import Loader from '../components/Loader';

function Bookings(props) {
  const upcomingURL = `${process.env.REACT_APP_API_URL}/bookings/upcoming`
  const [upcoming, setUpcoming] = useState([])

  console.log(props.loggedIn.token)
  
  useEffect(() => {
    axios.get(upcomingURL,  { headers: { Authorization: `Bearer ${props.loggedIn.token}` } })
    .then(response => {
      console.log(response.data.upcoming)
      setUpcoming(response.data.upcoming)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  if (upcoming.length==0) {
    return (<Loader/>)
  }

  return (
    <Flex
      minH={'100vh'}
      //align={'center'}
      justify={'center'}
    >
      <Stack spacing={6} mx={'auto'} w='full' py={12} px={2}>
        <Stack align={'center'}>
          <Heading fontSize={'3xl'}>
            Upcoming bookings
          </Heading>
          <Divider/>
          {/* <Text fontSize={'lg'} >
            {`Your account balance is ${props.loggedIn.balance}`}
          </Text> */}
        </Stack>
        {upcoming.map(booking => {
          return(
            <Flex>
              <Booking booking={booking}/>
            </Flex>
          )
        })}
        
        <RouteLink to={'/'}>
            <Button colorScheme={'blue'} width="full" size={'lg'}>Back to menu</Button>
            </RouteLink>
      </Stack>
    </Flex>
  )
}

export default Bookings