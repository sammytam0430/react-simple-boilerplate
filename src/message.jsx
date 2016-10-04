import React, {Component} from 'react';

const Message = React.createClass({

  render: function() {
    console.log("Rendering <Message/>");
    return (
      <div className="message">
        <span className="username">{this.props.username}</span>
        <span className="content">{this.props.content}</span>
      </div>
    );
  }

});

export default Message;