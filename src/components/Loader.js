import React from 'react';
import { Flex, Spinner } from '@chakra-ui/react';

function Loader() {
  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Flex>
  );
}

export default Loader;
