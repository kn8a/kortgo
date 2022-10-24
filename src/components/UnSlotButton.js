import React from 'react'
import { useState } from 'react'
import { Button } from '@chakra-ui/react'

function UnSlotButton(props) {
    const [selected, setSelected] = useState({variant: 'solid', tennis: ''})
  const select = (e) => {
    props.unselect(e)
    if (selected.variant == 'solid') {
      setSelected({variant: 'outline', tennis: '🎾' })
    } else {
      setSelected({variant: 'solid', tennis: '' })
    }
  }
  return (
    
    <Button
        id={props.slot.value}
        variant={selected.variant}
        onClick={select}
        isDisabled={props.slot.booked}
        size={'lg'}
        m={2}
        p={2}
        colorScheme={'red'}
        >
        {`x ${props.slot.time}`} {selected.tennis}
        
    </Button>
  )
}

export default UnSlotButton