import React, { Component, CSSProperties } from "react";

import { ProfileContextHelpers as Profile } from "../../helpers/ProfileContextHelpers";

import { Message } from "../../model/Message";

import "./message-component.css";

type IState = { time : Date };

export default class MessageComponent extends Component<Message, IState>
{
  state : IState = { time : new Date(0) };

  fromProfile : boolean = false;

  UNSAFE_componentWillMount = () =>
  {
    this.fromProfile = Profile.profileContext?.profile.id === this.props.author.id;
  };

  componentDidMount = () =>
  {
    const date = new Date(0);

    date.setUTCSeconds(this.props.time);

    this.setState({ time : date });
  };

  messageStyle = () : CSSProperties =>
  {
    if (this.fromProfile)
    {
      return {
        background : "#EFEFEF",
        boxShadow: "0px 5px 6px -2px rgba(0,0,0,0.25)",
	      color : "#323232",
        marginLeft : "auto"
      };
    }
    return {
      background : "#323232",
      boxShadow : "0 5px 14px -6px rgba(0,0,0,0.75)",
      animationName : "chat-message-left"
    };
  };

  textDiv = (style : CSSProperties = { wordBreak : "break-all" }) =>
  (
    <div style={style}>
      <span>{this.props.text}</span>
    </div>
  );

  timeDiv = (style? : CSSProperties) =>
  (
    <div id="chat-message-time" style={style}>
      <span>{`${this.state.time.getHours()}:${this.state.time.getMinutes()}`}</span>
    </div>
  );

  render = () => (
    <div
      className="message-div"
      id={`message-${this.props.id}`}
      style={this.messageStyle()}
    >
      {
        this.fromProfile
        ?
        <>
         {this.textDiv()}
         {this.timeDiv({ marginLeft : 10 })}
        </>
        :
        <>
          {this.timeDiv({ marginRight : 10 })}
          {this.textDiv()}
        </>
      }
    </div>
  );
}