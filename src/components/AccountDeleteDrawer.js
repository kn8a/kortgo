import {
    Flex,
    Text,
    Button,
    Heading,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Divider,
    HStack,
  } from '@chakra-ui/react';

export default function AccountDeleteDrawer(props) {
    return (
      <Drawer
        isOpen={props.isDelOpen}
        placement="right"
        onClose={props.onDelClose}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Confirm account deletion</DrawerHeader>
  
          <DrawerBody>
            <Flex flexDirection={'column'} gap="4">
              <Divider />
              <Heading color={'red'} fontSize="x-large">
                Warning: Account deletion is final and cannot be undone!
              </Heading>
              <Divider />
              <Heading fontSize="large" mt={4}>
                Account deletion requirements:
              </Heading>
              <Text>1. You don't have any upcoming bookings.</Text>
              <Text>2. Your account balance is 0.</Text>
            </Flex>
          </DrawerBody>
  
          <DrawerFooter display={'flex'} gap="4" flexDirection="column">
            <Heading color={'red'} fontSize="medium">
              Account deletion is irreversible!
            </Heading>
            <HStack justifyContent={'space-between'}>
              <Button
                colorScheme={'red'}
                mr={3}
                onClick={props.onDelClose}
                size="lg"
                isDisabled={props.loading.delete}
              >
                X Cancel
              </Button>
              <Button
                colorScheme="green"
                size={'lg'}
                onClick={props.delAccount}
                loadingText="Processing..."
                isLoading={props.loading.delete}
              >
                Confirm deletion
              </Button>
            </HStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }