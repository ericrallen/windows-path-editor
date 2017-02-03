import React from 'react';

function Title(props) {
  return (
    <h1 className="application-title">{props.title}</h1>
  );
}

Title.propTypes = {
  title: React.PropTypes.string,
};

export default Title;
