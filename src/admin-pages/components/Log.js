import React from 'react';

import {
  useColorModeValue,
  Flex,
  Text,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  useDisclosure,
  useToast,
  FormControl,
  Input,
  FormLabel,
  Textarea,
  Select,
} from '@chakra-ui/react';
import axios from 'axios';
import { DateTime } from 'luxon';
import { useNavigate } from 'react-router';
import { FaEdit } from 'react-icons/fa';

function Log(props) {
  return (
    <Flex>
      <Text fontSize={'sm'}>{props.log.text}</Text>
      <Text fontSize={'sm'}>
        {DateTime.fromISO(props.log.createdAt).toLocaleString(
          DateTime.DATE_SHORT
        )}
      </Text>
    </Flex>
  );
}

export default Log;
