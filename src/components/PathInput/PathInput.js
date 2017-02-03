import React from 'react';

/**
 * @method PathInput
 * @description Component for displaying individual input for $PATH item
 * @param {Object} props properties passed to Component
 */
function PathInput(props) {
  return (
    <input
      name={`path-input-${props.index}`}
      id={`path-inpu-${props.index}`}
      className="path-list-item-input"
      type="text"
      defaultValue={props.path}
      onInput={props.change}
    />
  );
}

PathInput.propTypes = {
  path: React.PropTypes.string,
  index: React.PropTypes.number,
  change: React.PropTypes.func,
};

export default PathInput;
