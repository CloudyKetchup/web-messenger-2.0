import React, { FC, CSSProperties } from "react";

import { CircularProgress } from "@material-ui/core";

import WaitingGif from "../../assets/waiting.gif";

const style : CSSProperties = {
  height : "100%",
  lineHeight : 50,
  background : "white",
  textAlign : "center",
  color : "black"
};

export const LoadingScreenComponent : FC = () =>
(
  <div style={style}>
    <div style={{ height : "30%" }}>
      <img src={WaitingGif}/>
    </div>
    <CircularProgress color="inherit"/>
  </div>
);