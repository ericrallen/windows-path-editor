import React from 'react';

import PathItem from '../PathItem/PathItem';

/**
 * @method PathList
 * @description Component for displaying list of path items
 * @param {Object} props properties passed to Component
 */
function PathList(props) {
  const { change } = props;

  // iterate through $PATHs and create list items with inputs
  const entries = props.paths.map((item, index) => {
    if (item) {
      return (
        <PathItem key={`path-string-${index}`} path={item} change={change} index={index} />
      );
    }

    return false;
  });

  return (
    <ul className="path-list">
      {(entries)}
    </ul>
  );
}

PathList.propTypes = {
  paths: React.PropTypes.array,
  change: React.PropTypes.func,
};

export default PathList;
