package com.krypton.notificationservice.service.friendshiprequest;

import com.krypton.common.model.request.FriendRequest;
import com.krypton.notificationservice.service.INotificationService;

import java.util.Optional;

public interface IFriendshipRequestNotificationService extends INotificationService<FriendRequest, String>
{
  Optional<FriendRequest> createNotification(String from, String to);
}