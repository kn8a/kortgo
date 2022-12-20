import {
  Flex,
  Text,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';

export default function EmailDrawer(props) {
  return (
    <Drawer
      isOpen={props.isEmailOpen}
      placement="right"
      onClose={props.onEmailClose}
      size="md"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Confirm email change</DrawerHeader>
        <DrawerBody>
          <Flex flexDirection={'column'} gap="4">
            <Text fontSize={'larger'}>
              Change email address from <strong>{props.email}</strong> to{' '}
              <strong>{props._email}</strong>?
            </Text>
            <small>
              Email is only used to send important notifications about your
              bookings. No spam!
            </small>
          </Flex>
        </DrawerBody>
        <DrawerFooter justifyContent={'space-between'}>
          <Button
            colorScheme={'red'}
            mr={3}
            onClick={props.onEmailClose}
            size="lg"
            isDisabled={props.loading.email}
          >
            X Cancel
          </Button>
          <Button
            colorScheme="green"
            size={'lg'}
            onClick={props.submitEmailUpdate}
            loadingText="Processing..."
            isLoading={props.loading.email}
          >
            Confirm and save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
