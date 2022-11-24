import React from 'react';
import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

export const ColorModeSwitcher = props => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <IconButton
      size="md"
      fontSize="lg"
      aria-label={`Switch to ${text} mode`}
      variant='solid'
      shadow={'md'}
      marginLeft="2"
      onClick={toggleColorMode}
      bg="orange" _dark={{ bg: 'orange.700' }}
      icon={<SwitchIcon />}
      {...props}
    ></IconButton>
  );
};
