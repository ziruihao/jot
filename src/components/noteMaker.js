import React, { Component } from 'react';

class NoteMaker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.submitted = this.submitted.bind(this);
  }

  onInputChange(event) {
    console.log(event.target.value);
    this.setState({
      title: event.target.value,
    });
  }

  submitted(event) {
    this.props.createNote(this.state.title);
  }

  render() {
    return (
      <div>
        <div>
          <input onChange={this.onInputChange} value={this.state.title} />
        </div>
        <div>
          <button type="button" onClick={this.submitted} />
        </div>
      </div>
    );
  }
}

export default NoteMaker;
