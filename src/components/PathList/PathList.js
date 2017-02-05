import React from 'react';

import PathItem from '../PathItem/PathItem';

/**
 * @method PathList
 * @description Component for displaying list of path items
 * @param {Object} props properties passed to Component
 */
function PathList({ change, submit, paths = {} }) {
  // iterate through $PATHs and create list items with inputs
  const entries = Object.keys(paths).map((item) => {
    const path = paths[item];

    return (
      <PathItem key={`path-string-${item}`} path={path} change={change} submit={submit} index={item} />
    );
  });

  return (
    <ul className="path-list">
      {entries}
    </ul>
  );
}

PathList.propTypes = {
  paths: React.PropTypes.object,
  change: React.PropTypes.func,
  submit: React.PropTypes.func,
};

export default PathList;
