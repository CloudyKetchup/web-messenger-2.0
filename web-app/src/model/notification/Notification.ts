export enum NotificationType
{
  DEFAULT,
  FRIEND_REQUEST,
  MESSAGE,
  ERROR,
  WARNING
};

export interface Notification
{
  id    : string
  text  : string
  type  : NotificationType
}