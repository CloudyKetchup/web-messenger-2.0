import { Notification } from "../model/notification/Notification";

import { NotificationComponentContext } from "../util/NotificationComponentContext";

export class NotificationContextHelpers
{
  notifications : Notification[] = [];
  private static instance : NotificationContextHelpers;

  private constructor() {}

  static getInstance = () : NotificationContextHelpers =>
  {
    if (!NotificationContextHelpers.instance)
    {
      NotificationContextHelpers.instance = new NotificationContextHelpers();
    }
    return NotificationContextHelpers.instance;
  };

  addNotification = (notification : Notification) =>
  {
    const findFirst = this.findById(notification.id);

    if (!findFirst)
    {
      this.notifications.push(notification);

      NotificationComponentContext.getInstance().updateNotifications(this.notifications);
    }
  };

  deleteNotification = (id : string) =>
  {
    for (let i = 0; i < this.notifications.length; i++)
    {
      if (this.notifications[i].id === id)
      {
        this.notifications.splice(i, 1);

        NotificationComponentContext.getInstance().updateNotifications(this.notifications);
      }
    }
  }; 

  findById = (id : string) : Notification | undefined =>
  {
    return this.notifications.filter(n => n.id === id)[0];
  };
}