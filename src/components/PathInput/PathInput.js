import React from 'react';

/**
 * @method PathInput
 * @description Component for displaying individual input for $PATH item
 * @param {Object} props properties passed to Component
 */
function PathInput({ index, path, change }) {
  return (
    <input
      name={`path-input-${index}`}
      id={`path-inpu-${index}`}
      className="path-list-item-input"
      type="text"
      defaultValue={path}
      onInput={change}
    />
  );
}

PathInput.propTypes = {
  path: React.PropTypes.string,
  index: React.PropTypes.string,
  change: React.PropTypes.func,
};

export default PathInput;
