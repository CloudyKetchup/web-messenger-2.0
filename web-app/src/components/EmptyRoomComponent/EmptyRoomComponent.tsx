import React, { FC } from "react";

import { ReactComponent as ChatIcon } from "../../assets/chat-icon.svg";

import "./empty-room-component.css";

export const EmptyRoomComponent : FC = () =>
(
  <div className="room-skeleton">
    <ChatIcon style={{ fill : "gray", fontSize : 25, height : 150, width : 150 }}/>
    <div style={{ fontSize : 20, marginTop : -950 }}>
      <span>Select a chat or add some friends</span>
    </div>
  </div>
);