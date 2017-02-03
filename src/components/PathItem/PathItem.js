import React from 'react';

import PathInput from '../PathInput/PathInput';
import PathLabel from '../PathLabel/PathLabel';

/**
 * @method PathItem
 * @description Component for displaying list item for path
 * @param {Object} props properties passed to Component
 */
function PathItem(props) {
  return (
    <li className="path-list-item">
      <PathLabel index={props.index} />
      <PathInput path={props.path} index={props.index} change={props.change} />
    </li>
  );
}

PathItem.propTypes = {
  path: React.PropTypes.string,
  index: React.PropTypes.number,
  change: React.PropTypes.func,
};

export default PathItem;
