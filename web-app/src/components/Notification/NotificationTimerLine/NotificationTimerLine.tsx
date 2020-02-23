import React, { Component } from "react";

type IProps = {
  onComplete? : () => void
};

type IState = {
  progress : number
};

export class NotificationTimerLine extends Component<IProps, IState>
{
  state : IState = {
    progress : 100
  };

  timer : NodeJS.Timeout | undefined;

  componentDidMount = () =>
  {
    this.selfDestroyTimer();
  };

  componentWillUnmount = () => this.timer && clearInterval(this.timer);

  selfDestroyTimer = () =>
  {
    this.timer = setInterval(async () =>
    {
      if (this.state.progress === 0 && this.timer)
      {
        this.props.onComplete && this.props.onComplete();
      }
      this.setState({ progress : this.state.progress - 1 });
    }, 50);
  };

  render = () => (
    <div className="notification-timer-line" style={{
      position  : "absolute",
      bottom    : 0,
      left      : 0,
      width     : `${this.state.progress}%`,
      height    : 5,
      background: "#35CE8D",
      borderBottomLeftRadius: 2,
      borderBottomRightRadius: 2
    }}>
      <div style={{ width : this.state.progress }} id="notification-timer-line-progress"/>
    </div>
  );
}