import React, { Component, FC } from "react";

import App from "../../../App";
import { NotificationComponent } from "../NotificationComponent";

import { Notification, NotificationType } from "../../../model/notification/Notification";
import { ChatMessageNotification } from "../../../model/notification/ChatMessageNotification ";

import { RoomContextHelpers }     from "../../../helpers/RoomContextHelpers";
import { ProfileContextHelpers }  from "../../../helpers/ProfileContextHelpers";

import { NotificationComponentContext } from "../../../util/NotificationComponentContext";

import "./notifications-pad.css";

type IProps = {
  app : App
};

type IState = {
  notifications : Notification[]
};

let zIndex = 1;

export class NotificationPad extends Component<IProps, IState>
{
  state : IState = {
    notifications : []
  };
  
  componentDidMount = () =>
  {
    NotificationComponentContext.getInstance().registerComponent(this);
  };

  private Factory : FC<Notification> = props =>
  {
    const chatMessageNotificationClick = (notification : ChatMessageNotification) =>
    {
      const room = ProfileContextHelpers.findRoomById(notification.room.id);

      room && RoomContextHelpers.changeRoom({
        data : room,
        user : notification.message.author,
        stats: undefined
      });
    };

    switch (props.type)
    {
      case NotificationType.FRIEND_REQUEST:
        return <NotificationComponent
                style={{ zIndex : zIndex++ }}
                key={props.id}
                data={props}
                onClick={this.props.app.toggleFriendRequestsPane}
              />;
      case NotificationType.MESSAGE:
        return <NotificationComponent
                style={{ zIndex : zIndex++ }}
                key={props.id}
                data={props}
                onClick={() => chatMessageNotificationClick(props as ChatMessageNotification)}
              />;
      default :
        return <NotificationComponent
	      style={{ zIndex : zIndex++ }}
	      key={props.id}
	      data={props}
        />;
    }
  };
      
  render = () => (
    <div className="notification-pad">
      <div style={{ position : "relative" }}>
        {this.state.notifications.map(this.Factory)}
      </div>
    </div>
  );
}