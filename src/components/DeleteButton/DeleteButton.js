import React from 'react';

/**
 * @method DeleteButton
 * @description Component for displaying $PATH item delete button
 * @param {Object} props properties passed to Component
 */
function DeleteButton({ index, path, text }) {
  return (
    <button id={`delete-path-${index}`} className="path-list-item-button" type="submit">
      {text}
      <span className="visually-hidden">{`Delete ${path}`}</span>
    </button>
  );
}

DeleteButton.propTypes = {
  path: React.PropTypes.string,
  text: React.PropTypes.string,
  index: React.PropTypes.string,
};

export default DeleteButton;
