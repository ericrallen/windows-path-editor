import React from 'react';

/**
 * @method CharacterCount
 * @description Component for displaying character count
 * @param {Object} props properties passed to Component
 */
function CharacterCount({ chars }) {
  return (
    <div className="application-character-count">
      <p>{chars} Characters</p>
    </div>
  );
}

CharacterCount.propTypes = {
  chars: React.PropTypes.number,
};

export default CharacterCount;
