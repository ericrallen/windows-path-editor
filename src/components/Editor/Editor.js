import React, { Component } from 'react';

import Title from '../Title/Title';
import CharacterCount from '../CharacterCount/CharacterCount';
import PathList from '../PathList/PathList';

/**
 * @method getIndexFromID
 * @description take a formatted ID string like path-item-1 and convert it into the relevant index
 * @param {String} id the ID string
 */
function getIndexFromID(id) {
  return id.split('-').pop();
}

/**
 * @method generatePathString
 * @description take path object and reduce it to colon-separated $PATH string
 * @param {Object} pathObject an object of path strings with arbitrary keys
 */
function generatePathString(pathObject = {}) {
  return Object.keys(pathObject).map(index => pathObject[index]).join(';');
}

/**
 * @class Editor
 * @extends Component
 * @description $PATH Editor application container
 */
class Editor extends Component {
  /**
   * @method constructor
   * @memberof Editor
   * @description initialize component
   * @param {Object} props properties to pass to this Component
   * @param {Object} context component context
   * @returns new instance of Editor Component
   */
  constructor(props, context) {
    super(props, context);

    this.onInput = this.onInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // initialize empty state
    this.state = {
      pathObject: {},
      pathString: '',
    };
  }

  /**
   * @method componentWillMount
   * @memberof Editor
   * @description retrieve $PATH data for component mounting
   */
  componentWillMount() {
    // fetch $PATH as JSON Data
    fetch('/path')
      .then(response => response.json().then((json) => {
        // get paths Array from JSON response
        const { paths } = json;

        // update pathObject and pathString in state
        let { pathObject, pathString } = this.state;

        pathObject = paths;

        pathString = generatePathString(pathObject);

        this.setState({
          pathObject,
          pathString,
        });
      }),
    );
  }

  /**
   * @method onSubmit
   * @memberof Editor
   * @description delete item from $PATH
   * @param {Event} e click event passed on by onClick React handler
   */
  onSubmit(e) {
    // prevent reload from form submission
    e.preventDefault();

    // get event target
    const { target } = e;

    // get target id
    const { id } = target;

    // get index for our $PATH item from id attribute
    const index = getIndexFromID(id);

    // update pathObject and pathString in state
    const { pathObject } = this.state;
    let { pathString } = this.state;

    delete pathObject[index];

    pathString = generatePathString(pathObject);

    this.setState({
      pathObject,
      pathString,
    });

    return false;
  }

  /**
   * @method onInput
   * @memberof Editor
   * @description respond to input event and update state
   * @param {Event} e input event passed by onInput React handler
   */
  onInput(e) {
    // get event target
    const { target } = e;

    // get new value
    const { value, id } = target;

    // get index for item in our $PATH array from id attribute
    const index = getIndexFromID(id);

    // update pathObject and pathString in state
    const { pathObject } = this.state;
    let { pathString } = this.state;

    pathObject[index] = value;

    pathString = generatePathString(pathObject);

    this.setState({
      pathObject,
      pathString,
    });

    return true;
  }

  /**
   * @method render
   * @memberof Editor
   * @description render our Editor Component
   */
  render() {
    return (
      <section className="application">
        <Title title="$PATH Editor" />
        <CharacterCount chars={this.state.pathString.length} />
        <PathList paths={this.state.pathObject} change={this.onInput} submit={this.onSubmit} />
      </section>
    );
  }
}

export default Editor;
