import React, { Component, CSSProperties } from "react";

import { ProfileContextHelpers as Profile } from "../../helpers/ProfileContextHelpers";

import { Message } from "../../model/Message";

import "./message-component.css";

type IProps = {
  data : Message
};

type IState = {
  time : Date
};

export default class MessageComponent extends Component<IProps, IState> {
  state : IState = {
    time : new Date(this.props.data.time)
  };

  messageStyle = () : CSSProperties => {
    if (Profile.profileContext?.profile.id === this.props.data.author.id) {
      return {
        background : "#6C6EA0",
        borderBottomRightRadius : 0,
        marginLeft : "auto"
      };
    }
    return {
      background : "#181818",
      borderBottomLeftRadius: 0
    };
  }

  render = () => (
    <div
      className="message-div"
      id={`message-${this.props.data.id}`}
      style={this.messageStyle()}
    >
      <div style={{ wordBreak : "break-all" }}>
        <span>{this.props.data.text}</span>
      </div>
      <div>
        <span>{`${this.state.time.getHours()}:${this.state.time.getMinutes()}`}</span>
      </div>
    </div>
  );
}