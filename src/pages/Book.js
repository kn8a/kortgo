import React from 'react'
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
import SlotButton from '../components/SlotButton';

function Book() {
  const availabilityURL = `${process.env.REACT_APP_API_URL}/bookings/check/`

  const [date, setDate] = useState('')

  const onDateChange = (e) => {
    setDate(e.target.value)
  }
  
  const checkAvailability = (e) => {
    axios.get(`${availabilityURL}${date}`)
    .then((response) => {
      console.log(response.data)
    })
  }
  
  const buildTimes = () => {
    let slots= []
    for (let i=7; i<22; i++) {
      slots.push({time: `${i}:00`, value: i})
      slots.push({time: `${i}:30`, value: i+0.5})
    }
    return slots
  }
  const times = buildTimes()
  console.log(times)
  return (
    <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>New booking</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              Select date to continue 🎾
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={6}>
              <FormControl id="email">
                <FormLabel>Select date</FormLabel>
                <Input 
                onChange={onDateChange}
                size={'lg'}
                type="date" 
                required
                // onChange={onChange}
                // value={credentials.email}
                name='date'
                
                />
              </FormControl>
              
                <Button
                  colorScheme={'blue'}
                  size={'lg'}
                  onClick={checkAvailability}
                  >
                  Check availability
                </Button>
                <Flex maxH={400} gap={0} direction={'column'} width={250} overflow={'auto'}>
                  {times.map(slot=> {
                    return (
                      <SlotButton slot={slot}/>
                      
                      //   <Button 
                      //   size={'lg'}
                      //   m={2}
                      // p={2}
                      // colorScheme={'green'}
                      // key={slot.value} 
                      // >{slot.time}</Button>
                      
                        
                      
                    )
                  })}
                </Flex>


            </Stack>
          </Box>
        </Stack>
      </Flex>
  )
}

export default Book