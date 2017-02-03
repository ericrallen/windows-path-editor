import React from 'react';

import PathInput from '../PathInput/PathInput';

function PathItem(props) {
  return (
    <li className="path-list-item">
      <PathInput path={props.path} change={props.change} />
    </li>
  );
}

PathItem.propTypes = {
  path: React.PropTypes.string,
  change: React.PropTypes.func,
};

export default PathItem;
