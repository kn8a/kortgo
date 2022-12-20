import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  InputGroup,
  FormHelperText,
  Divider,
} from '@chakra-ui/react';

export default function PasswordDrawer(props) {
  return (
    <Drawer
      isOpen={props.isPassOpen}
      placement="right"
      onClose={props.onPassClose}
      size="md"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Password change</DrawerHeader>
        <DrawerBody>
          <Flex flexDirection={'column'} gap="4">
            <Divider />
            <FormControl id="password" isRequired>
              <FormLabel>New password</FormLabel>
              <InputGroup>
                <Input
                  name="password"
                  placeholder='********'
                  shadow={'inner'}
                  required
                  onChange={props.onPassChange}
                  value={props.pass.password}
                  type="password"
                />
              </InputGroup>
              <FormHelperText>Must be at least 8 characters.</FormHelperText>
            </FormControl>
            <FormControl id="confirmPass" isRequired>
              <FormLabel>Confirm new password</FormLabel>
              <InputGroup>
                <Input
                  required
                  placeholder='********'
                  shadow={'inner'}
                  onChange={props.onPassChange}
                  value={props.pass.confirmPass}
                  name="confirmPass"
                  type="password"
                />
              </InputGroup>
            </FormControl>
          </Flex>
        </DrawerBody>
        <DrawerFooter justifyContent={'space-between'}>
          <Button
            colorScheme={'red'}
            mr={3}
            onClick={() => {
              props.onPassClose();
              props.setPass({
                password: '',
                confirmPass: '',
              });
            }}
            size="lg"
            isDisabled={props.loading.password}
          >
            X Cancel
          </Button>
          <Button
            colorScheme="green"
            size={'lg'}
            onClick={props.submitPass}
            loadingText="Processing..."
            isLoading={props.loading.password}
          >
            Change password
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
