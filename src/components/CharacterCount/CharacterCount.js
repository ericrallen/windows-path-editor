import React from 'react';

import Icon from '../Icon/Icon';

import {
  LOCK,
  UNLOCK,
} from '../Icon/icons/icons';

/**
 * @method CharacterCount
 * @description Component for displaying character count
 * @param {Object} props properties passed to Component
 */
function CharacterCount({ chars }) {
  const maxChars = 1024;

  const characterStatus = chars < maxChars;

  return (
    <div className={`${(characterStatus) ? 'application-character-count--ok' : 'application-character-count--too-many-chars'} application-character-count`}>
      <Icon id={(characterStatus) ? UNLOCK : LOCK} /> {chars}
      <span className="visually-hidden">Characters</span>
    </div>
  );
}

CharacterCount.propTypes = {
  chars: React.PropTypes.number,
};

export default CharacterCount;
