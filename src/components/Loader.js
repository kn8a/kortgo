import React from 'react';
import { Flex, Spinner, Text } from '@chakra-ui/react';

function Loader() {
  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'} flexDirection='column' gap={2}>
      <Spinner
        thickness="10px"
        speed="0.65s"
        emptyColor="green.100"
        color="green.400"
        size="xl"
      />
      <Text>Loading... Please wait.</Text>
    </Flex>
  );
}

export default Loader;
