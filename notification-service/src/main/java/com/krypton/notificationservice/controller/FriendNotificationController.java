package com.krypton.notificationservice.controller;

import com.krypton.common.model.request.FriendRequest;
import lombok.AllArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/friend")
public class FriendNotificationController extends MainController
{
  private final SimpMessagingTemplate simpMessagingTemplate;

  @PostMapping("/friend/send/friend-request")
  void sendFriendRequestNotification(@RequestBody FriendRequest notification)
  {
    simpMessagingTemplate.convertAndSend("/n/friend/request", notification);
  }
}