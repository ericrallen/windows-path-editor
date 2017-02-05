import React from 'react';

/**
 * @method PathLabel
 * @description Component for displaying label for path item input
 * @param {Object} props properties passed to Component
 */
function PathLabel({ index }) {
  return (
    <label className="path-list-item-label visually-hidden" htmlFor={`path-item-${index}`}>Path Entry {index + 1}</label>
  );
}

PathLabel.propTypes = {
  index: React.PropTypes.string,
};

export default PathLabel;
