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
  Divider,
  useDisclosure,
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
import { FaArrowLeft } from 'react-icons/fa';
var array = require('lodash/array');

function Book(props) {
  const bookingURL = `${process.env.REACT_APP_API_URL}/bookings`;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();
  useEffect(() => {
    if (!props.loggedIn.token) {
      navigate('/login');
    }
  }, []);
  const toast = useToast();
  const availabilityURL = `${process.env.REACT_APP_API_URL}/bookings/check/`;

  const [date, setDate] = useState(''); //used for date selection
  const [times, setTimes] = useState([]); //received available times from API
  const [selected, setSelected] = useState([]); //used for user selected times

  const onDateChange = e => {
    setDate(e.target.value);
    setTimes([]);
    setSelected([]);
  };

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const totalAmount = selected.reduce((total, slot) => {
      return total + slot.price;
    }, 0);
    setTotalPrice(totalAmount);
  }, [selected, times, date]);

  const checkAvailability = e => {
    setTimes([]);
    setSelected([]);
    axios
      .get(`${availabilityURL}${date}`)
      .then(response => {
        //console.log(response.data.times);
        setTimes(response.data.times);
      })
      .catch(error => {
        setTimes([]);
        //console.log(error)
        toast({
          title: 'Error',
          description: error.response.data.message,
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
        // toast.error(error.response.data.message)
        // setRegBtnState("")
      });
  };

  const select = e => {
    let slotObj = times.find(time => time.value == e.target.id);
    // let slotObj2 = times.find(time => time.value==Number(e.target.id)+0.5)
    let newTimes = array.pull(times, slotObj);
    let newSelected = [...selected, slotObj];
    newSelected.sort((a, b) => (a.value > b.value ? 1 : -1));
    setSelected(newSelected);
    setTimes(newTimes);
  };

  const unselect = e => {
    let slotObj = selected.find(time => time.value == e.target.id);
    // let slotObj2 = selected.find(time => time.value==Number(e.target.id)+0.5)
    let newTimes = [...times, slotObj];
    newTimes.sort((a, b) => (a.value > b.value ? 1 : -1));
    let newSelected = array.pull(selected, slotObj);
    // ([...selected, slotObj, slotObj2])
    // newSelected.sort((a,b)=> (a.value>b.value) ? 1:-1)
    setSelected(newSelected);
    setTimes(newTimes);
  };

  const checkSlots = () => {
    if (selected.length < 2) {
      toast({
        title: 'Booking error',
        description:
          'Bookings must be at least 1 hour long. Please select at least 2 consecutive slots and retry.',
        status: 'error',
        duration: 8000,
        isClosable: true,
      });
      return;
    }
    for (let i = 1; i < selected.length; i++) {
      if (selected[i].value - selected[i - 1].value != 0.5) {
        toast({
          title: `Error on slot "${selected[i].time}"`,
          description: `A booking must have consecutive time slots. If you need to book non consecutive times, you may do so in a separate booking`,
          status: 'error',
          duration: 8000,
          isClosable: true,
        });
        return;
      }
    }
    onOpen();
  };

  const submitBooking = () => {
    console.log(props.loggedIn.token);

    axios
      .post(
        bookingURL,
        { date: date, slots: selected },
        { headers: { Authorization: `Bearer ${props.loggedIn.token}` } }
      )
      .then(response => {
        props.updateBalance()
        onClose();
        toast({
          title: 'Booking Confirmed',
          description: `Your booking has been confirmed. Your remaining balance is ${response.data.remainingBalance}.`,
          status: 'success',
          duration: 8000,
          isClosable: true,
        });
        checkAvailability();
      })
      .catch(err => {
        toast({
          title: 'Booking error',
          description: err.response.data.message,
          status: 'error',
          duration: 8000,
          isClosable: true,
        });
      });
  };

  return (
    <>
      <Flex
        minH={'100vh'}
        align={'flex-start'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
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
            <Heading fontSize={'4xl'}>New booking</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              Select date to continue 🎾
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
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
                  name="date"
                />
              </FormControl>

              <Button
                colorScheme={'blue'}
                size={'lg'}
                onClick={checkAvailability}
              >
                Check availability
              </Button>
              <Divider />
              <Flex justifyContent={'space-between'}>
                <Flex
                  maxH={400}
                  gap={0}
                  direction={'column'}
                  minWidth={'130px'}
                  overflow={'auto'}
                  alignItems="center"
                  shadow={'inner'}
                  p={2}
                >
                  <Text>Available</Text>
                  <Text fontSize={'smaller'}>(Click to select)</Text>
                  {times.map(slot => {
                    return (
                      <Flex key={slot.time}>
                        <SlotButton slot={slot} select={select} />
                      </Flex>
                    );
                  })}
                </Flex>
                <Divider orientation="vertical" />

                <Flex
                  maxH={400}
                  gap={0}
                  direction={'column'}
                  minWidth={'130px'}
                  overflow={'auto'}
                  alignItems="center"
                  shadow={'inner'}
                  p={2}
                >
                  <Text>Selected</Text>
                  <Text fontSize={'smaller'}>(Click to remove)</Text>
                  {selected.map(slot => {
                    return (
                      <Flex key={slot.time} justifyContent="center">
                        <UnSlotButton slot={slot} unselect={unselect} />
                      </Flex>
                    );
                  })}
                </Flex>
              </Flex>
              <Box>
                <Text align={'center'}>
                  Booking duration: <strong>{`${selected.length / 2} `}</strong>
                  hour/s
                </Text>
                <Text align={'center'}>
                  Total price: <strong>{totalPrice}</strong>
                </Text>
                <Text align={'center'}>
                  Available balance: <strong>{props.loggedIn.balance}</strong>
                </Text>
              </Box>

              <Button colorScheme={'blue'} size={'lg'} onClick={checkSlots}>
                <Text>Book</Text>
              </Button>
              
            </Stack>
          </Box>
        </Stack>
        <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Confirm your booking</DrawerHeader>

            <DrawerBody justifyContent={'space-evenly'}>
              <Flex direction={'column'} gap={6}>
                <Box>
                  <Text fontWeight={600} fontSize="lg">
                    Date:
                  </Text>
                  <Text>{date}</Text>
                </Box>

                <Box>
                  <Text fontWeight={600} fontSize="lg">
                    Selected time slots:
                  </Text>
                  {selected.map(slot => {
                    return (
                      <div key={slot.value}>
                        <Text>{slot.time} (+ 30 mins)</Text>
                      </div>
                    );
                  })}
                </Box>
                <Box>
                  <Text fontWeight={600} fontSize="lg">
                    Total duration:
                  </Text>
                  {`${selected.length / 2} hour/s`}
                </Box>
                <Box>
                  <Divider mt={2} mb={2} />

                  <Flex alignItems="center" justifyContent={'space-evenly'}>
                    <Text fontWeight={600} fontSize="lg">
                      Total price:
                    </Text>
                    <Text>{totalPrice}</Text>
                  </Flex>
                  <Divider mt={2} mb={2} />
                </Box>
              </Flex>
            </DrawerBody>

            <DrawerFooter justifyContent={'space-evenly'}>
              <Button colorScheme={'red'} mr={3} onClick={onClose} size="lg">
                X Cancel
              </Button>
              <Button colorScheme="green" size={'lg'} onClick={submitBooking}>
                🎾 Confirm & Pay
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Flex>
    </>
  );
}

export default Book;
