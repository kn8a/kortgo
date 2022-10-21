import { Button } from '@chakra-ui/react'
import React, { useState } from 'react'

function SlotButton(props) {

  const [selected, setSelected] = useState({variant: 'solid', tennis: ''})
  const select = () => {
    if (selected.variant == 'solid') {
      setSelected({variant: 'outline', tennis: '🎾' })
    } else {
      setSelected({variant: 'solid', tennis: '' })
    }
  }



  return (
    <Button
        variant={selected.variant}
        onClick={select}
        isDisabled={props.slot.booked}
        size={'lg'}
        m={2}
        p={2}
        colorScheme={'green'}
        >
        {props.slot.time} {selected.tennis}
        
    </Button>
  )
}

export default SlotButton