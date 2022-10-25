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
  useToast,
  Divider,
  Modal,
  ModalOverlay,
  useDisclosure,
  ModalBody,
  ModalFooter,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,

} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { Link as RouteLink } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SlotButton from '../components/SlotButton';
import UnSlotButton from '../components/UnSlotButton';
var array = require('lodash/array');

function Book(props) {

  const bookingURL = `${process.env.REACT_APP_API_URL}/bookings`

  const { isOpen, onOpen, onClose } = useDisclosure()

  const navigate = useNavigate()
  useEffect(()=> {
    if (!props.loggedIn.token) {
      navigate('/login')
    }
    
  })
  const toast = useToast()
  const availabilityURL = `${process.env.REACT_APP_API_URL}/bookings/check/`

  const [date, setDate] = useState('') //used for date selection
  const [times, setTimes] = useState([]) //received available times from API
  const [selected,setSelected] = useState([]) //used for user selected times

  const onDateChange = (e) => {
    setDate(e.target.value)
    setTimes([])
    setSelected([])
  }

  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    const totalAmount = selected.reduce((total, slot) => {
      return total + slot.price
    },0)
    setTotalPrice(totalAmount)
  }, [selected,times,date])
  
  const checkAvailability = (e) => {
    setTimes([])
    setSelected([])
    axios.get(`${availabilityURL}${date}`)
    .then((response) => {
      console.log(response.data.times)
      setTimes(response.data.times)

    })
    .catch((error) => {
      setTimes([])
      //console.log(error)
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

  const select = (e) => {
    let slotObj = times.find(time => time.value==e.target.id)
    // let slotObj2 = times.find(time => time.value==Number(e.target.id)+0.5)
    let newTimes = array.pull(times,slotObj)
    let newSelected = ([...selected, slotObj])
    newSelected.sort((a,b)=> (a.value>b.value) ? 1:-1)
    setSelected(newSelected)
    setTimes(newTimes)
  }
  
  const unselect = (e) => {
    let slotObj = selected.find(time => time.value==e.target.id)
    // let slotObj2 = selected.find(time => time.value==Number(e.target.id)+0.5)
    let newTimes = [...times, slotObj]
    newTimes.sort((a,b)=> (a.value>b.value) ? 1:-1)
    let newSelected = array.pull(selected,slotObj)
    // ([...selected, slotObj, slotObj2])
    // newSelected.sort((a,b)=> (a.value>b.value) ? 1:-1)
    setSelected(newSelected)
    setTimes(newTimes)
  }

  const submitBooking = () => {
    console.log(props.loggedIn.token)
    axios.post(bookingURL, {date: date, slots: selected}, { headers: { Authorization: `Bearer ${props.loggedIn.token}` } } )
    .then((response)=> {

    })
    .catch((err)=>{
      toast({
        title: "Booking error",
        description: err.response.data.message,
        status: 'error',
        duration: 8000,
        isClosable: true,
      })
    })
  }
  
  return (
    <>
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
            <Stack spacing={4}>
              <FormControl id="date">
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
                <Divider/>
                <Flex justifyContent={'space-between'}>
                <Flex maxH={400} gap={0} direction={'column'} minWidth={'130px'} overflow={'scroll'} alignItems='center' shadow={'inner'} p={2}>
                  <Text>Available</Text>
                  <Text fontSize={'smaller'}>(Click to select)</Text>
                  {times.map(slot=> {
                    return (
                      <Flex key={slot.time}>
                        <SlotButton slot={slot} select={select}/>
                      </Flex>                   
                    )
                  })}
                </Flex>
                <Divider orientation='vertical'/>
                
                <Flex maxH={400} gap={0} direction={'column'} minWidth={'130px'} overflow={'scroll'} alignItems='center' shadow={'inner'} p={2}>
                  <Text>Selected</Text>
                  <Text fontSize={'smaller'}>(Click to remove)</Text>
                  {selected.map(slot=> {
                    return (
                      <Flex key={slot.time} justifyContent='center'>
                        <UnSlotButton slot={slot} unselect={unselect}/>
                      </Flex>
                      
                      
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

                </Flex>
                <Box>
                <Text align={'center'}>Booking total price: <strong>{totalPrice}</strong></Text>
                <Text align={'center'} fontSize={'xs'}>(Reminder: Two slots is 1 hour)</Text>
                </Box>
                
                <Button

                  colorScheme={'blue'}
                  size={'lg'}
                  onClick={onOpen}
                  >
                  <Text>Book</Text>
                  
                </Button>
            </Stack>
          </Box>
        </Stack>
        <Drawer
                  isOpen={isOpen}
                  placement='right'
                  onClose={onClose}
                  size='md'
                  
                  
                >
                  <DrawerOverlay />
                  <DrawerContent >
                    <DrawerCloseButton />
                    <DrawerHeader >Confirm your booking</DrawerHeader>

                    <DrawerBody justifyContent={'space-evenly'}>
                      <Flex direction={'column'} gap={6}>

                      
                    <Box >
                      <Text fontWeight={600} fontSize='lg'>Date:</Text>
                      <Text>{date}</Text>
                    </Box>

                    <Box>
                      <Text fontWeight={600} fontSize='lg'>Selected time slots:</Text>
                      {selected.map(slot => {
                        return(
                          <div key={slot.value}>
                            <Text>{slot.time}</Text>
                          </div>
                        )
                      })}
                    </Box>
                    <Box>
                    <Text align={'center'} fontSize={'sm'}>(Reminder: Two slots is 1 hour)</Text>
                    <Divider mt={4} mb={4}/>
                    <Flex alignItems='center' justifyContent={'space-evenly'}>
                      <Text fontWeight={600} fontSize='lg'>Total price:</Text>
                      <Text>{totalPrice}</Text>
                    </Flex>
                    
                    </Box>
                    
                    
                    
                    </Flex>
                    </DrawerBody>

                    <DrawerFooter justifyContent={'space-evenly'}>
                      <Button colorScheme={'red'} mr={3} onClick={onClose} size='lg'>
                        X Cancel
                      </Button>
                      <Button colorScheme='green' size={'lg'}>🎾 Confirm!</Button>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
      </Flex>
      
      </>
  )
}

export default Book