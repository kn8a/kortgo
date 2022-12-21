import React, { useEffect, useState } from 'react';

import { useColorModeValue, Flex, Text, Divider } from '@chakra-ui/react';
import axios from 'axios';
import { DateTime } from 'luxon';

function UserLog(props) {
  const [color, setColor] = useState('');
  useEffect(() => {
    switch (props.log.type) {
      case 'booking':
        setColor('green');
        break;
      case 'topup':
        setColor('yellow');
        break;
      case 'registration':
        setColor('cyan');
        break;
      case 'edit':
        setColor('purple');
        break;
      case 'refund':
        setColor('red');
        break;
      case 'check-in':
        setColor('blue');
        break;
    }
  });
  return (
    <div>
      <Flex
        rounded={'lg'}
        bg={useColorModeValue(`${color}.100`, `${color}.700`)}
        boxShadow={'md'}
        p={2}
        w="full"
        justifyContent={'space-between'}
        flexDirection={'column'}
        gap={2}
      >
        <Flex gap={4}>
          <Text fontSize={'sm'}>{props.log.text}</Text>
          <Flex flexDirection={'column'}>
            <Text fontSize={'sm'} textAlign="right">
              {DateTime.fromISO(props.log.createdAt).toLocaleString(
                DateTime.DATE_SHORT
              )}
            </Text>
            <Text fontSize={'sm'} textAlign="right">
              {props.log.type}
            </Text>
          </Flex>
        </Flex>
      </Flex>

      <Divider />
    </div>
  );
}

export default UserLog;
