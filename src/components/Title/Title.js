import React from 'react';

/**
 * @method Title
 * @description Component for displaying application title
 * @param {Object} props properties passed to Component
 */
function Title({ title }) {
  return (
    <h1 className="application-title">{title}</h1>
  );
}

Title.propTypes = {
  title: React.PropTypes.string,
};

export default Title;
