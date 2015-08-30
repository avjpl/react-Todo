var React = require('react');
var Firebase = require('firebase');
var rootUrl = 'https://scorching-fire-4830.firebaseio.com/';

module.exports = React.createClass({
  getInitialState: function() {
    return {
      text: this.props.item.text,
      done: this.props.item.done,
      textChanged: false
    }
  },
  componentWillMount: function() {
    this.fb = new Firebase(rootUrl + "items/" + this.props.item.key);
  },
  handleDoneChange: function(evt) {
    var update = {done: evt.target.checked};

    this.setState(update);
    this.fb.update(update);
  },
  handleDeleteClick: function(evt) {
    this.fb.remove();
  },
  handleTextChange: function(evt) {
    this.setState({
      text: evt.target.value,
      textChanged: true
    });
  },
  handleUndoClick: function(evt) {
    this.setState({
      text: this.props.item.text,
      textChanged: false
    });
  },
  handleSaveClick: function(evt) {
    this.fb.update({text: this.state.text});
    this.setState({textChanged: false});
  },
  changesButtons: function() {
    if (! this.state.textChanged) {
      return null;
    } else {
      return [
        <button className="btn btn-default"
                onClick={this.handleSaveClick}
          >
          Save
        </button>,
        <button className="btn btn-default"
                onClick={this.handleUndoClick}
          >
          Undo
        </button>
      ];
    }
  },
  render: function() {
    return <li>
      <div className="input-group">
        <span className="input-group-addon">
         <input
           type="checkbox"
           checked={this.state.done}
           onChange={this.handleDoneChange}
           />
        </span>

        <input type="text"
               disabled={this.state.done}
               className="form-control"
               value={this.state.text}
               onChange={this.handleTextChange}
          />

        <span className="input-group-btn">
          {this.changesButtons()}
          <button
            className="btn btn-danger"
            onClick={this.handleDeleteClick}>
            Delete
          </button>
        </span>
      </div>
    </li>
  }
});