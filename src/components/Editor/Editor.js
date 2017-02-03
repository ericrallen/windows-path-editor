import React, { Component } from 'react';

import Title from '../Title/Title';
import CharacterCount from '../CharacterCount/CharacterCount';
import PathList from '../PathList/PathList';

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

    // initialize empty state
    this.state = {
      pathArray: [],
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

        // update pathArray and pathString in state
        let { pathArray, pathString } = this.state;

        pathArray = paths;

        pathString = paths.join(';');

        this.setState({
          pathArray,
          pathString,
        });
      }),
    );
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
    const { value } = target;

    // get index for item in our $PATH array from id attribute, EX: path-item-0
    const index = target.id.split('-').pop();

    // update pathArray and pathString in state
    const { pathArray } = this.state;
    let { pathString } = this.state;

    pathArray[index] = value;

    pathString = pathArray.join(';');

    this.setState({
      pathArray,
      pathString,
    });
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
        <PathList paths={this.state.pathArray} change={this.onInput} />
      </section>
    );
  }
}

export default Editor;
