import React from 'react'
import { Flex, Stack, Divider, Heading, Button, Text } from '@chakra-ui/react';
import { Link as RouteLink } from 'react-router-dom';
import { FaArrowLeft, FaCaretLeft } from 'react-icons/fa';

function Howto() {
  return (
    <Flex
      minH={'100vh'}
      align={'flex-start'}
      justify={'center'}
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
        <Stack align={'center'} px={4}>
          <Heading fontSize={'2xl'}>How to use the booking system</Heading>
          <Divider />
          <Heading fontSize={'large'}>1. Balance top-up</Heading>
            <Text>1.1. You can top-up your balance at the juristic office.</Text>
            <Text>1.2. You may top-up any amount, the amount will be reflected in your balance and is available for use at any time.</Text>
            <Text>1.3. <strong>If your balance is depleted or is lower than your desired booking cost, you will not be able to complete the booking.</strong></Text>
          <Divider/>
          <Heading fontSize={'large'}>2. Booking</Heading>
          <Text>2.1. To make a booking, click on "Make a booking" from the main menu.</Text>
          <Text>2.2. On the "New Booking" screen, select the desired date and click on "Check availability". <strong>(you will get an error if you select a date in the past)</strong></Text>
          <Text>2.3. Select the desired time slots. <strong>Time slots are 30 minute slots.</strong></Text>
          <Text>2.4. Once desired time slots appear in the "Selected" column, click "Book".</Text>
          
          <Text>2.5. Time slots that are <strong>disabled (greyed out) are unavailable</strong>. Either because they are in the past, or already booked by someone else.</Text>
            <Text>2.6. A booking must be at least 1 hour long <strong>(minimum 2 time slots).</strong></Text>
            <Text>2.7. A booking must contain <strong>only consecutive time slots</strong>. If you need to book non-consecutive time slots, you may do so in a new booking.</Text>
            <Text>2.8. If you get an error, pay attention to the details in the <strong>error message</strong>.</Text>
            <Divider/>
            <Heading fontSize={'large'}>3. Cancellation</Heading>
            <Text>2.1. You can cancel a booking at any time, <strong>before its start time</strong>.</Text>
            <Text>2.2. Upon cancellation, you will <strong>automatically receive credit</strong> for the booking.</Text>
            <Text>2.3. If you <strong>already checked-in</strong> with the guard, the booking <strong>cannot be cancelled</strong>.</Text>
            <Text>2.4. In the event you require a credit or partial credit for a booking after its start time (eg. rain), please see juristic office for further assistance.</Text>
            
        </Stack>
      </Stack>
    </Flex>
  )
}

export default Howto