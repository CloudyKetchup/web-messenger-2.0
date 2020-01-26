package com.krypton.accountservice.service.request.friendship;

import com.krypton.accountservice.feign.FriendRequestFeignClient;
import com.krypton.accountservice.feign.NotificationFeignClient;
import com.krypton.accountservice.feign.UserFeignClient;
import com.krypton.common.model.request.FriendRequest;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class FriendshipRequestService implements IFriendshipRequestService
{
  private final UserFeignClient userFeignClient;
  private final NotificationFeignClient notificationFeignClient;
  private final FriendRequestFeignClient friendRequestFeignClient;

  @Override
  public void send(String from, String to)
  {
    var fromUser = userFeignClient.findById(from);
    var toUser = userFeignClient.findById(to);

    if (!sent(from, to) && fromUser.isPresent() && toUser.isPresent())
    {
      var request = friendRequestFeignClient.save(new FriendRequest(fromUser.get(), toUser.get()));

      if (request.isPresent())
      {
        addToUser(request.get());

        if (!sent(from, to))
        {
          delete(request.get());
        }
        // TODO: test it
//      if (sent(from, to))
//      {
//        notificationFeignClient.sendFriendRequestNotification(request);
//      }
      }
    }
  }

  @Override
  public boolean sent(String from, String to)
  {
    var toUser = userFeignClient.findById(to);
    var fromUser = userFeignClient.findById(from);

    if (toUser.isPresent() && fromUser.isPresent())
    {
      return userFeignClient
        .getFriendRequest(to)
        .parallelStream()
        .anyMatch(request -> request.getFrom().getId().equals(fromUser.get().getId()));
    }
    return false;
  }

  @Override
  public Optional<FriendRequest> save(FriendRequest request)
  {
    return friendRequestFeignClient.save(request);
  }

  @Override
  public void delete(FriendRequest request)
  {
    friendRequestFeignClient.delete(request.getId());
  }

  private void addToUser(FriendRequest request)
  {
    userFeignClient.addFriendRequest(request);
  }
}