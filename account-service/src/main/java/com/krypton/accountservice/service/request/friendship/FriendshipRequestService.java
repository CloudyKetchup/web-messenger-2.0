package com.krypton.notificationservice.service.friendshiprequest;

import com.krypton.common.model.request.FriendRequest;
import com.krypton.notificationservice.feign.FriendRequestFeignClient;
import com.krypton.notificationservice.feign.UserFeignClient;
import lombok.AllArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class FriendshipRequestNotificationService implements IFriendshipRequestNotificationService
{
  private final FriendRequestFeignClient feignClient;
  private final UserFeignClient userFeignClient;
  private final SimpMessagingTemplate simpMessagingTemplate;

  @Override
  public Optional<FriendRequest> createNotification(String from, String to)
  {
    var fromUser = userFeignClient.findById(from);
    var toUser = userFeignClient.findById(to);

    if (fromUser.isEmpty() || toUser.isEmpty()) return Optional.empty();

    return Optional.of(new FriendRequest(fromUser.get(), toUser.get()));
  }

  @Override
  public void sendNotification(FriendRequest notification)
  {
    var target = notification.getTo();

    simpMessagingTemplate.convertAndSend(notification);
  }

  @Override
  public void sendNotification(String from, String to)
  {
    var fromUser = userFeignClient.findById(from);
    var toUser = userFeignClient.findById(to);

    if (fromUser.isPresent() && toUser.isPresent())
    {
      sendNotification(new FriendRequest(fromUser.get(), toUser.get()));
    }
  }

  @Override
  public boolean sent(String from, String to)
  {
    var toUser = userFeignClient.findById(to);
    var fromUser = userFeignClient.findById(from);
    final boolean[] result = {false};

    if (toUser.isPresent() && fromUser.isPresent())
    {
      toUser.get()
        .getFriendRequests()
        .parallelStream()
        .forEach(notification -> {
          if (notification.getFrom().getId().equals(fromUser.get().getId()))
          {
            result[0] = true;
          }
        });
    }
    return result[0];
  }

  @Override
  public Optional<FriendRequest> save(FriendRequest notification)
  {
    return feignClient.save(notification);
  }
}