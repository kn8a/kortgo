import React from 'react';
import {
  Box,
  Stack,
  useColorModeValue,
  Flex,
  Text,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router';

function BookingAdmin(props) {
  const toast = useToast();
  const cancelURL = `${process.env.REACT_APP_API_URL}/admin/bookings/cancel`;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const cancelBooking = () => {
    axios
      .put(cancelURL, props.booking, {
        headers: { Authorization: `Bearer ${props.loggedIn.token}` },
      })
      .then(response => {
        props.updateBookings();
        onClose();
        toast({
          title: 'Booking cancelled',
          description: response.data.message,
          status: 'success',
          duration: 8000,
          isClosable: true,
        });
      })
      .catch(err => {
        toast({
          title: 'Cancellation failed',
          description: err.message,
          status: 'error',
          duration: 8000,
          isClosable: true,
        });
      });
  };
  return (
    <Flex w={'full'}>
      <Flex
        rounded={'lg'}
        bg={useColorModeValue('green.50', 'green.700')}
        boxShadow={'md'}
        p={2}
        w="full"
        justifyContent={'space-between'}
        flexDirection={'column'}
        gap={2}
      >
        <Flex flexDirection={'column'}>
          <Text>
            <strong>Date:</strong>
            {` ${props.booking.day}/${props.booking.month}/${props.booking.year}`}
          </Text>
          <Text>
            <strong>Duration:</strong>
            {` ${props.booking.slots.length / 2} hour/s`}
          </Text>

          <Text>
            <strong>Time slots:</strong>
          </Text>
          <Flex gap={2} wrap="wrap">
            {props.booking.slots_full.map(time => {
              return <Text key={time.time}>{time.time}</Text>;
            })}
          </Flex>
        </Flex>
        <Divider />
        <Flex justifyContent={'flex-end'} alignItems={'center'} w="full">
          <Button colorScheme={'red'} size={'sm'} onClick={onOpen}>
            Refund/Cancel this booking
          </Button>
        </Flex>
      </Flex>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Confirm cancellation</DrawerHeader>

          <DrawerBody justifyContent={'space-evenly'}>
            <Flex direction={'column'} gap={6}>
              <Box>
                <Text fontWeight={600} fontSize="lg">
                  Date:
                </Text>
                <Text>{` ${props.booking.day}/${props.booking.month}/${props.booking.year}`}</Text>
              </Box>

              <Box>
                <Text fontWeight={600} fontSize="lg">
                  Time slots:
                </Text>
                {props.booking.slots_full.map(time => {
                  return <Text key={time.time}>{time.time}</Text>;
                })}
              </Box>
              <Box>
                <Text fontWeight={600} fontSize="lg">
                  Total duration:
                </Text>
                {` ${props.booking.slots.length / 2} hour/s`}
              </Box>
              <Box>
                <Divider mt={2} mb={2} />

                <Flex alignItems="center" justifyContent={'space-evenly'}>
                  <Text fontWeight={600} fontSize="lg">
                    Credit amount:
                  </Text>
                  <Text>{props.booking.amount}</Text>
                </Flex>
                <Divider mt={2} mb={2} />
              </Box>
            </Flex>
          </DrawerBody>

          <DrawerFooter
            justifyContent={'space-evenly'}
            display="flex"
            flexDirection={'column'}
          >
            <Text pb={4}>
              <strong>This cannot be undone</strong>
            </Text>
            <Flex>
              <Button colorScheme={'blue'} mr={3} onClick={onClose} size="lg">
                Go back
              </Button>
              <Button colorScheme="red" size={'lg'} onClick={cancelBooking}>
                Confirm cancellation
              </Button>
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}

export default BookingAdmin;
