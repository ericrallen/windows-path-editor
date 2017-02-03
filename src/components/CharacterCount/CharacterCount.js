import React from 'react';

/**
 * @method CharacterCount
 * @description Component for displaying character count
 * @param {Object} props properties passed to Component
 */
function CharacterCount(props) {
  return (
    <div className="application-character-count">
      <p>{props.chars} Characters</p>
    </div>
  );
}

CharacterCount.propTypes = {
  chars: React.PropTypes.number,
};

export default CharacterCount;
