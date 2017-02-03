import React from 'react';

/**
 * @method PathLabel
 * @description Component for displaying label for path item input
 * @param {Object} props properties passed to Component
 */
function PathLabel(props) {
  return (
    <label className="path-list-item-label visually-hidden" htmlFor={`path-item-${props.index}`}>Path Entry {props.index + 1}</label>
  );
}

PathLabel.propTypes = {
  index: React.PropTypes.number,
};

export default PathLabel;
