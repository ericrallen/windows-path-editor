import React, { Component } from 'react';

import PathInput from '../PathInput/PathInput';
import PathLabel from '../PathLabel/PathLabel';
import DeleteButton from '../DeleteButton/DeleteButton';

/**
 * @method PathItem
 * @description Component for displaying list item for path
 * @param {Object} props properties passed to Component
 */
function PathItem({ index, change, submit, path }) {
  return (
    <li className="path-list-item">
      <form id={`path-item-form-${index}`} onSubmit={submit}>
        <PathLabel index={index} />
        <PathInput path={path} index={index} change={change} />
        <DeleteButton text="X" path={path} index={index} />
      </form>
    </li>
  );
}

PathItem.propTypes = {
  path: React.PropTypes.string,
  index: React.PropTypes.string,
  change: React.PropTypes.func,
  submit: React.PropTypes.func,
};

export default PathItem;
