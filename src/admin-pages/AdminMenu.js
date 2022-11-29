import React from 'react';
import {
  Flex,
  Box,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link as RouteLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { LockIcon } from '@chakra-ui/icons';
import {
  FaDonate,
  FaBarcode,
  FaUsersCog,
  FaUserPlus,
  FaRegCalendarPlus,
  FaFileInvoiceDollar,
  FaDatabase,
  FaRegListAlt,
  FaRegCalendarTimes,
} from 'react-icons/fa';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

function AdminMenu(props) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!props.loggedIn.token) {
      navigate('/login');
    }
  });

  return (
    <Flex
      minH={'100vh'}
      align={'flex-start'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={4} mx={'auto'} maxW={'lg'} py={4} px={4}>
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
          p={4}
        >
          <Stack
            spacing={4}
            alignContent="center"
            alignItems={'center'}
            width="full"
          >
            <Flex flexDir={'column'} gap="2" w={'100%'}>
              <Heading size={'md'}>Manage Bookings</Heading>
              <RouteLink to={'/admin/invite'}>
                <Button
                  justifyContent="flex-start"
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
                  justifyContent="flex-start"
                  colorScheme={'blue'}
                  width="full"
                  leftIcon={<FaFileInvoiceDollar />}
                >
                  Refund past booking
                </Button>
              </RouteLink>
              <RouteLink to={'/admin/future-bookings'}>
                <Button
                  justifyContent="flex-start"
                  colorScheme={'blue'}
                  width="full"
                  leftIcon={<FaRegCalendarTimes />}
                >
                  Cancel future booking
                </Button>
              </RouteLink>
            </Flex>

            <Flex flexDir={'column'} gap="2" w={'100%'}>
              <Heading size={'md'}>Manage Users</Heading>
              <RouteLink to={'/admin/topup'}>
                <Button
                  justifyContent="flex-start"
                  colorScheme={'blue'}
                  width="full"
                  leftIcon={<FaDonate />}
                >
                  Top-up
                </Button>
              </RouteLink>
              <RouteLink to={'/admin/invite'}>
                <Button
                  justifyContent="flex-start"
                  colorScheme={'blue'}
                  width="full"
                  leftIcon={<FaBarcode />}
                >
                  New invite code
                </Button>
              </RouteLink>
              <RouteLink to={'/admin/manage-users'}>
                <Button
                  justifyContent="flex-start"
                  colorScheme={'blue'}
                  width="full"
                  leftIcon={<FaUsersCog />}
                >
                  Manage existing users
                </Button>
              </RouteLink>
              <RouteLink to={'/admin/add-user'}>
                <Button
                  justifyContent="flex-start"
                  colorScheme={'blue'}
                  width="full"
                  leftIcon={<FaUserPlus />}
                >
                  Create new user
                </Button>
              </RouteLink>
            </Flex>
            <Flex flexDir={'column'} gap="2" w={'100%'}>
              <Heading size={'md'}>Maintenance</Heading>
              <RouteLink to={'/admin/logs'}>
                <Button
                  justifyContent="flex-start"
                  colorScheme={'blue'}
                  width="full"
                  leftIcon={<FaRegListAlt />}
                >
                  View logs
                </Button>
              </RouteLink>
              <RouteLink to={'/admin/past-bookings'}>
                <Button
                  justifyContent="flex-start"
                  disabled
                  colorScheme={'blue'}
                  width="full"
                  leftIcon={<FaDatabase />}
                >
                  Database maintenance
                </Button>
              </RouteLink>
            </Flex>

            {/* <Button colorScheme={'blue'}>My account</Button> */}
            <Flex gap={4} justifyContent="center">
              <ColorModeSwitcher />
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
            </Flex>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default AdminMenu;
