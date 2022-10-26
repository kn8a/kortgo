import { Button, Flex, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

function SlotButton(props) {

  const select = e => {
    props.select(e);
    
  };

  return (
    <Button
      display={'flex'}
      flexDirection='column'
      shadow={'md'}
      id={props.slot.value}
      
      onClick={select}
      isDisabled={props.slot.booked}
      size={'lg'}
      mt={2}
      colorScheme={'green'}
    >
      
      {`+ ${props.slot.time}`}

      
      
      
      
    </Button>
  );
}

export default SlotButton;
