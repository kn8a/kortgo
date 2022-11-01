import React from 'react';
import {
  Box,
  Stack,
  useColorModeValue,
  Flex,
  Text,
  Button,
  Divider,
} from '@chakra-ui/react';

function Booking(props) {
  return (
    <Flex w={'full'}>
      <Flex
        rounded={'lg'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'lg'}
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
              return <Text>{time.time}</Text>;
            })}
          </Flex>
        </Flex>
            <Divider/>
        <Flex justifyContent={'flex-end'} alignItems={'center'} w='full'>
          <Button colorScheme={'red'} size={'sm'}>Cancel booking</Button>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Booking;
