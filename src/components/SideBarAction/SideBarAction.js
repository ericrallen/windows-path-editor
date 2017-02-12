import React from 'react';
import Icon from '../Icon/Icon';

function SideBarAction({ action, display, ada, icon }) {
  return (
    <button className="application-sidebar-action" onClick={action}>
      <Icon id={icon} />
      <span className="application-sidebar-action-text">{display}</span>
      <span className="visually-hidden">{ada}</span>
    </button>
  );
}

SideBarAction.propTypes = {
  action: React.PropTypes.func,
  display: React.PropTypes.string,
  ada: React.PropTypes.string,
  icon: React.PropTypes.string,
};

export default SideBarAction;
