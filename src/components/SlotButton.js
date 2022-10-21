import { Button } from '@chakra-ui/react'
import React from 'react'

function SlotButton(props) {
  return (
    <Button
        size={'lg'}
        m={2}
        p={2}
        colorScheme={'green'}
        >
        {props.slot.time}
        
    </Button>
  )
}

export default SlotButton