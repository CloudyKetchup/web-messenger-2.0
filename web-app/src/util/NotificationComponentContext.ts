import ComponentContext from "./ComponentContext";

import { Notification } from "../model/notification/Notification";

import { NotificationPad } from "../components/Notification/NotificationPad/NotificationPad";

export class NotificationComponentContext extends ComponentContext
{
  private static instance : NotificationComponentContext;
  private notificationsPad : NotificationPad | undefined;

  private constructor()
  {
    super();
  }

  static getInstance = () : NotificationComponentContext =>
  {
    if (!NotificationComponentContext.instance)
    {
      NotificationComponentContext.instance = new NotificationComponentContext();
    }
    return NotificationComponentContext.instance;
  };

  updateNotifications = (notifications : Notification[]) =>
  {
    const setState = () => this.notificationsPad && this.notificationsPad.setState({ notifications : notifications });

    if (!this.notificationsPad)
    {
      this.notificationsPad = this.components.filter(c => c instanceof NotificationPad)[0] as NotificationPad;
    }
    setState();
  };
}