package com.krypton.notificationservice.service;

public interface INotificationService<N, ID>
{
  void sendNotification(N notification);
}
