import React from 'react';

import SideBarAction from '../SideBarAction/SideBarAction';

function SideBar({ actions }) {
  const buttons = [];

  actions.forEach((item, key) => {
    buttons.push(
      <SideBarAction key={`action-${key}`} {...item} />
    );
  });

  return (
    <aside className="application-sidebar">
      {buttons}
    </aside>
  );
}

SideBar.propTypes = {
  actions: React.PropTypes.any, //no good type for Map
};

export default SideBar;
