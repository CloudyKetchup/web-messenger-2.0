import React, { Component, CSSProperties } from "react";

import { ProfileContextHelpers as Profile } from "../../helpers/ProfileContextHelpers";

import { Message } from "../../model/Message";

import "./message-component.css";

type IProps = { data : Message };

type IState = { time : Date };

export default class MessageComponent extends Component<IProps, IState>
{
  state : IState = { time : new Date(0) };

  fromProfile : boolean = false;

  UNSAFE_componentWillMount = () =>
  {
    this.fromProfile = Profile.profileContext?.profile.id === this.props.data.author.id;
  };

  componentDidMount = () =>
  {
    const date = new Date(0);

    date.setUTCSeconds(this.props.data.time);

    this.setState({ time : date });
  };

  messageStyle = () : CSSProperties =>
  {
    if (this.fromProfile)
    {
      return {
        background : "#858AE3",
        borderBottomRightRadius : 0,
        marginLeft : "auto"
      };
    }
    return {
      background : "#181818",
      borderBottomLeftRadius: 0,
      animationName : "chat-message-left"
    };
  };

  textDiv = (style : CSSProperties = { wordBreak : "break-all" }) =>
  (
    <div style={style}>
      <span>{this.props.data.text}</span>
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
      id={`message-${this.props.data.id}`}
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