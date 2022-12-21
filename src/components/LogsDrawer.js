import {
    Flex,
    FormControl,
    FormLabel,
    Stack,
    Button,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Select,
    Divider,
  } from '@chakra-ui/react';
  import UserLog from '../components/UserLog';

export default function LogsDrawer(props) {
    return (
      <Drawer
        isOpen={props.isLogsOpen}
        placement="right"
        onClose={props.onLogsClose}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>View my activity</DrawerHeader>
  
          <DrawerBody>
            <FormControl id="duration" isRequired>
              <FormLabel fontSize={'sm'} fontWeight="bold">
                Duration
              </FormLabel>
              <Select
                name="duration"
                placeholder="Select option"
                onChange={props.onDurChange}
              >
                <option value="3">Past 3 Days</option>
                <option value="7">Past 7 Days</option>
                <option value="30">Past 30 Days</option>
              </Select>
            </FormControl>
            <Stack spacing={2} pt={2}>
              <Button
                onClick={props.fetchLogs}
                loadingText="Loading..."
                isLoading={props.logs}
                size="md"
                colorScheme={'blue'}
              >
                Get my activity
              </Button>
            </Stack>
            <Divider mt={2} mb={2} />
            <Flex flexDirection={'column'} gap={2} px={2}>
              {props._logs.map(log => {
                return (
                  <div key={log._id}>
                    <UserLog log={log} />
                  </div>
                );
              })}
            </Flex>
          </DrawerBody>
  
          <DrawerFooter>
            <Button
              colorScheme={'red'}
              mr={3}
              onClick={props.onLogsClose}
              size="lg" //isDisabled={confirmBookLoading}
            >
              X Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }