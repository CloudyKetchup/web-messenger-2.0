import React, { Component, CSSProperties } from "react";

import { Notification } from "../../model/notification/Notification";

import { NotificationTimerLine } from "./NotificationTimerLine/NotificationTimerLine";

import { NotificationContextHelpers } from "../../helpers/NotificationContextHelpers";

import "./notification.css";

type IProps = {
  data      : Notification
  style?    : CSSProperties
  onClick?  : () => void
};

type IState = {
  data : Notification
}

export class NotificationComponent extends Component<IProps, IState>
{
  state : IState = {
    data : this.props.data,
  };

  div : HTMLElement | null = null;

  componentDidMount = async () =>
  {
    this.div = document.getElementById(`notification-${this.state.data.id}`);

    this.addClickEvent();
  };

  componentWillUnmount = () => this.removeClickEvent();

  addClickEvent = () => this.div && this.div.addEventListener("click", this.onClick);

  removeClickEvent = () => this.div && this.div.removeEventListener("click", this.onClick);

  onClick = async () =>
  {
    this.props.onClick && this.props.onClick();
    this.selfDestroy();
  };

  selfDestroy = () =>
  {
    if (this.div)
    {
      this.div.style.marginTop = "-30px";
      this.div.style.opacity = "0";
    }
    setTimeout(() => NotificationContextHelpers.getInstance().deleteNotification(this.props.data.id), 300);
  };

  render = () => (
    <div
      className="notification"
      id={`notification-${this.state.data.id}`}
      style={this.props.style}
    >
      <div>
        <span>{this.props.data.text}</span>
      </div>
      <NotificationTimerLine onComplete={this.selfDestroy}/>
    </div>
  );
}