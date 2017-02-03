import React from 'react';

function PathInput(props) {
  return (
    <input type="text" value={props.path} onChange={props.change} />
  );
}

PathInput.propTypes = {
  path: React.PropTypes.string,
  change: React.PropTypes.func,
};

export default PathInput;
