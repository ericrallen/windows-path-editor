import React from 'react';

function SideBarAction({ action, display, ada }) {
  return (
    <button onClick={action}>{display}<span className="visually-hidden">{ada}</span></button>
  );
}

SideBarAction.propTypes = {
  action: React.PropTypes.func,
  display: React.PropTypes.string,
  ada: React.PropTypes.string,
};

export default SideBarAction;
