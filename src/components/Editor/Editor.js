import React, { Component } from 'react';

import Title from '../Title/Title';
import PathItem from '../PathItem/PathItem';

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
   * @param {OBject} context component context
   * @returns new instance of Editor Component
   */
  constructor(props, context) {
    super(props, context);

    // initialize empty state
    this.state = {
      pathArray: [],
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

        // get pathArray from current state
        let { pathArray } = this.state;

        // override pathArray with retrieved state
        pathArray = paths;

        // update pathArray state
        this.setState({
          pathArray,
        });
      }),
    );
  }

  onChange(e) {
    console.log(e);
  }

  /**
   * @method render
   * @memberof Editor
   * @description render our Editor Component
   */
  render() {
    // iterate through $PATHs and create inputs
    const entries = this.state.pathArray.map((item) => {
      if (item) {
        return (
          <PathItem path={item} change={this.onChange} />
        );
      }
    });

    return (
      <section className="application">
        <Title title="$PATH Editor" />
        <ul className="path-list">
          {(entries)}
        </ul>
      </section>
    );
  }
}

export default Editor;
