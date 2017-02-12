import React from 'react';

import Icon from '../Icon/Icon';

import { X } from '../Icon/icons/icons';

/**
 * @method DeleteButton
 * @description Component for displaying $PATH item delete button
 * @param {Object} props properties passed to Component
 */
function DeleteButton({ index, path }) {
  return (
    <button id={`delete-path-${index}`} className="path-list-item-button" type="submit">
      <Icon id={X} />
      <span className="visually-hidden">{`Delete ${path}`}</span>
    </button>
  );
}

DeleteButton.propTypes = {
  path: React.PropTypes.string,
  index: React.PropTypes.string,
};

export default DeleteButton;
