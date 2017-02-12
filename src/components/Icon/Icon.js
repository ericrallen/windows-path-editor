import React from 'react';

import PlusIcon from './icons/svg/plus.svg';
import XIcon from './icons/svg/x.svg';
import CheckIcon from './icons/svg/check.svg';
import LockIcon from './icons/svg/lock.svg';
import UnlockIcon from './icons/svg/unlock.svg';
import ExitIcon from './icons/svg/exit.svg';
import RebootIcon from './icons/svg/reboot.svg';

import {
  PLUS,
  X,
  CHECK,
  UNLOCK,
  LOCK,
  REBOOT,
  EXIT,
} from './icons/icons';



function Icon({ id }) {
  switch (id) {
    case PLUS:
      return (
        <PlusIcon />
      );

    case X:
      return (
        <XIcon />
      );

    case CHECK:
      return (
        <CheckIcon />
      );

    case LOCK:
      return (
        <LockIcon />
      );

    case UNLOCK:
      return (
        <UnlockIcon />
      );

    case EXIT:
      return (
        <ExitIcon />
      );

    case REBOOT:
      return (
        <RebootIcon />
      );

    default:
      return false;
  }
}

Icon.propTypes = {
  id: React.PropTypes.string.isRequired,
};

export default Icon;
