import React from 'react';

import SideBarAction from '../SideBarAction/SideBarAction';
import CharacterCount from '../CharacterCount/CharacterCount';
import Title from '../Title/Title';

function SideBar({ actions, paths }) {
  const buttons = [];

  actions.forEach((item, key) => {
    buttons.push(
      <SideBarAction key={`action-${key}`} {...item} />
    );
  });

  return (
    <aside className="application-sidebar">
      <Title title="$PATH" />
      {buttons}
      <CharacterCount chars={paths.length} />
    </aside>
  );
}

SideBar.propTypes = {
  actions: React.PropTypes.any, // no good type for Map
  paths: React.PropTypes.string,
};

export default SideBar;
