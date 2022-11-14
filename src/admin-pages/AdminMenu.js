import React from 'react';
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
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link as RouteLink } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {
  PhoneIcon,
  AddIcon,
  WarningIcon,
  InfoOutlineIcon,
  CalendarIcon,
  EditIcon,
  PlusSquareIcon,
  LockIcon,
} from '@chakra-ui/icons';
import {
  FaDonate,
  FaBarcode,
  FaUsersCog,
  FaUserPlus,
  FaRegCalendarPlus,
  FaFileInvoiceDollar,
  FaRegWindowClose,
  FaRegCalendarTimes,
} from 'react-icons/fa';

function AdminMenu(props) {
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>
            Welcome {`${props.loggedIn.name_first}`}
          </Heading>
          <Text fontSize={'lg'}>{`You are logged in as Admin`}</Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack
            spacing={6}
            alignContent="center"
            alignItems={'center'}
            width="full"
          >
            <Flex flexDir={'column'} gap="2">
              <Heading size={'md'}>Manage Bookings</Heading>
              <RouteLink to={'/admin/invite'}>
                <Button
                  disabled
                  colorScheme={'blue'}
                  width="full"
                  leftIcon={<FaRegCalendarPlus />}
                >
                  Add booking
                </Button>
              </RouteLink>
              <RouteLink to={'/admin/past-bookings'}>
                <Button
                  
                  colorScheme={'blue'}
                  width="full"
                  leftIcon={<FaFileInvoiceDollar />}
                >
                  Refund past booking
                </Button>
              </RouteLink>
              <RouteLink to={'/book-manage'}>
                <Button
                disabled
                  colorScheme={'blue'}
                  width="full"
                  leftIcon={<FaRegCalendarTimes />}
                >
                  Cancel future booking
                </Button>
              </RouteLink>
            </Flex>

            <Flex flexDir={'column'} gap="2">
              <Heading size={'md'}>Manage Users</Heading>
              <RouteLink to={'/admin/topup'}>
                <Button
                  colorScheme={'blue'}
                  width="full"
                  leftIcon={<FaDonate />}
                >
                  Top-up
                </Button>
              </RouteLink>
              <RouteLink to={'/admin/invite'}>
                <Button
                  colorScheme={'blue'}
                  width="full"
                  leftIcon={<FaBarcode />}
                >
                  New invite code
                </Button>
              </RouteLink>
              <RouteLink to={'/book-manage'}>
                <Button
                disabled
                  colorScheme={'blue'}
                  width="full"
                  leftIcon={<FaUsersCog />}
                >
                  Manage existing users
                </Button>
              </RouteLink>
              <RouteLink to={'/book-manage'}>
                <Button
                disabled
                  colorScheme={'blue'}
                  width="full"
                  leftIcon={<FaUserPlus />}
                >
                  Create new user
                </Button>
              </RouteLink>
            </Flex>

            {/* <Button colorScheme={'blue'}>My account</Button> */}
            <Button
              onClick={() => {
                props.setLogin({});
                props.logout();
              }}
              leftIcon={<LockIcon />}
              colorScheme={'red'}
            >
              Logout
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default AdminMenu;
