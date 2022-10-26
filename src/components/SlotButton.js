import { Button } from '@chakra-ui/react';
import React, { useState } from 'react';

function SlotButton(props) {
  const [selected, setSelected] = useState({ variant: 'solid', tennis: '' });
  const select = e => {
    props.select(e);
    if (selected.variant == 'solid') {
      setSelected({ variant: 'outline', tennis: '🎾' });
    } else {
      setSelected({ variant: 'solid', tennis: '' });
    }
  };

  return (
    <Button
      shadow={'md'}
      id={props.slot.value}
      variant={selected.variant}
      onClick={select}
      isDisabled={props.slot.booked}
      size={'lg'}
      mt={2}
      colorScheme={'green'}
    >
      {`+ ${props.slot.time}`} {selected.tennis}
    </Button>
  );
}

export default SlotButton;
