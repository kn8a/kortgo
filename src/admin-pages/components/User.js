import React, { useEffect, useState } from 'react';
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
import { FaEdit } from 'react-icons/fa';

function User(props) {
  const userUpdateURL = `${process.env.REACT_APP_API_URL}/admin/users/update`;
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [userOrg, setUserOrg] = useState(props.user);
  const [user, setUser] = useState(props.user);
  const [note, setNote] = useState('');

  const [color, setColor] = useState('green');
  const [warning, setWarning] = useState('');

  useEffect(() => {
    if (user._id == props.loggedIn.id) {
      setWarning(
        '⚠️Be careful!!! Do NOT to change your status/role. This can lock your account!!! If it must be changed, ask another Admin!⚠️'
      );
      setColor('red');
    }
  }, []);

  const cancelEdit = () => {
    setUser(userOrg);
    onClose();
  };

  // get key value pairs of difference between 2 objects
  const diff = (oldobj, newobj) => {
    const keys = Array.from(
      new Set([...Object.keys(oldobj), ...Object.keys(newobj)])
    );
    const diff = Object.entries({ ...oldobj, ...newobj }).filter(
      ([key]) => oldobj[key] !== newobj[key]
    );
    return Object.fromEntries(diff);
  };

  const submitChanges = () => {
    if (user == userOrg) {
      toast({
        title: 'No updates',
        description: 'There are no changes to submit',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    const beforeChange = diff(user, userOrg);
    const toChange = diff(userOrg, user);

    axios
      .put(
        userUpdateURL,
        { id: user._id, new: toChange, old: beforeChange, note: note },
        {
          headers: { Authorization: `Bearer ${props.loggedIn.token}` },
        }
      )
      .then(response => {
        props.updateUsers();
        setUser(userOrg);
        setNote('');
        onClose();
        toast({
          title: 'Update successful',
          description: 'User information has been updated.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      })
      .catch(err => {
        toast({
          title: 'Error updating user',
          description: err.response.data.message,
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
      });
  };

  const onNoteChange = e => {
    setNote(e.target.value);
  };

  const onFieldChange = e => {
    const value = e.target.value;
    setUser({
      ...user,
      [e.target.name]: value,
    });
  };

  return (
    <Flex w={'full'}>
      <Flex
        rounded={'lg'}
        bg={useColorModeValue(`${color}.50`, `${color}.700`)}
        boxShadow={'md'}
        p={2}
        w="full"
        justifyContent={'space-between'}
        gap={2}
      >
        <Flex flexDirection={'column'}>
          <Text>
            <strong>{props.user.address}</strong>
            {` - ${props.user.name_first} ${props.user.name_last}`}
          </Text>
          <small>
            <Text>{`${props.user.email}`}</Text>
          </small>

          <Flex gap={2}>
            <small>
              <Text>
                Balance: <strong>{props.user.balance}</strong>
              </Text>
            </small>
            <small>
              <Text>
                Status: <strong>{props.user.status}</strong>
              </Text>
            </small>
          </Flex>
        </Flex>
        <Flex alignItems={'center'}>
          <Button
            colorScheme={'blue'}
            size={'md'}
            shadow="md"
            onClick={onOpen}
            leftIcon={<FaEdit />}
          >
            Edit
          </Button>
        </Flex>
      </Flex>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader shadow={'md'}>
            {`Editing ${props.user.name_first} ${props.user.name_last}`}
            <Text color={'red'} fontSize="small">
              <strong>{warning}</strong>
            </Text>
          </DrawerHeader>

          <DrawerBody justifyContent={'space-evenly'} p={4}>
            <Flex direction={'column'} gap={4}>
              <Flex gap={2}>
                <FormControl id="name_first">
                  <FormLabel>
                    <small>First Name</small>
                  </FormLabel>
                  <Input
                    required
                    onChange={onFieldChange}
                    value={user.name_first}
                    name="name_first"
                    type="text"
                  />
                </FormControl>
                <FormControl id="name_last">
                  <FormLabel>
                    <small>Last Name</small>
                  </FormLabel>
                  <Input
                    required
                    onChange={onFieldChange}
                    value={user.name_last}
                    name="name_last"
                    type="text"
                  />
                </FormControl>
              </Flex>
              <Flex>
                <FormControl id="email">
                  <FormLabel>
                    <small>Email</small>
                  </FormLabel>
                  <Input
                    required
                    onChange={onFieldChange}
                    value={user.email}
                    name="email"
                    type="email"
                  />
                </FormControl>
              </Flex>

              <Flex gap={2}>
                <FormControl id="address">
                  <FormLabel>
                    <small>Address</small>
                  </FormLabel>
                  <Input
                    required
                    onChange={onFieldChange}
                    value={user.address}
                    name="address"
                    type="text"
                  />
                </FormControl>
                <FormControl id="balance">
                  <FormLabel>
                    <small>Balance</small>
                  </FormLabel>
                  <Input
                    required
                    onChange={onFieldChange}
                    value={user.balance}
                    name="balance"
                    type="number"
                  />
                </FormControl>
              </Flex>

              <Flex gap={2}>
                <FormControl id="status">
                  <FormLabel>
                    <small>Status</small>
                  </FormLabel>
                  <Select
                    name="status"
                    defaultValue={user.status}
                    onChange={onFieldChange}
                  >
                    <option value="approved">approved</option>
                    <option value="suspended">suspended</option>
                  </Select>
                </FormControl>
                <FormControl id="role">
                  <FormLabel>
                    <small>⛔Role</small>
                  </FormLabel>

                  <Select
                    name="role"
                    defaultValue={user.role}
                    onChange={onFieldChange}
                  >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                    <option value="guard">guard</option>
                  </Select>
                </FormControl>
              </Flex>
              <Flex>
                <FormControl id="note" isRequired>
                  <FormLabel>
                    <small>Admin note</small>
                  </FormLabel>
                  <Textarea
                    required
                    onChange={onNoteChange}
                    value={note}
                    name="note"
                    placeholder="(required) Explain the change and reason. For internal use (Not visible to user)"
                  />
                </FormControl>
              </Flex>
            </Flex>
          </DrawerBody>

          <DrawerFooter
            justifyContent={'space-evenly'}
            display="flex"
            flexDirection={'column'}
          >
            <Text pb={4}>
              <strong>⚠️ Ensure information accuracy</strong>
            </Text>
            <Text pb={4} textAlign="center" color={'red'}>
              <strong>{warning}</strong>
            </Text>
            <Flex>
              <Button
                colorScheme={'blue'}
                mr={3}
                onClick={cancelEdit}
                size="lg"
              >
                Go back
              </Button>
              <Button colorScheme="green" size={'lg'} onClick={submitChanges}>
                Submit changes
              </Button>
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}

export default User;
