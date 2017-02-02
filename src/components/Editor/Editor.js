import React, { Component } from 'react';

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

    // get props and store them locally
    this.props = props;

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

  /**
   * @method render
   * @memberof Editor
   * @description render our Editor Component
   */
  render() {
    // iterate through $PATHs and create inputs
    const entries = this.state.pathArray.map((item, index) => {
      if (item) {
        return (
          <li key={`path-${index}`}><input type="text" value={item} /></li>
        );
      }
    });

    return (
      <section>
        <ul>
          {(entries)}
        </ul>
      </section>
    );
  }
}

export default Editor;
