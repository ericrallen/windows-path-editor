import React from 'react';

import SideBarAction from '../SideBarAction/SideBarAction';

function SideBar({ actions }) {
  const buttons = Object.keys(actions).map((item) => {
    return (
      <SideBarAction key={`action-${item}`} {...actions[item]} />
    );
  });

  return (
    <aside className="application-sidebar">
      {buttons}
    </aside>
  );
}

SideBar.propTypes = {
  actions: React.PropTypes.object,
};

export default SideBar;
