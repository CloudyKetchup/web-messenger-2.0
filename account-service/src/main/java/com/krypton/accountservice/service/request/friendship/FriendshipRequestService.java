package com.krypton.accountservice.service.request.friendship;

import com.krypton.accountservice.feign.FriendFeignClient;
import com.krypton.accountservice.feign.FriendRequestFeignClient;
import com.krypton.accountservice.feign.UserFeignClient;
import com.krypton.accountservice.service.UserService;
import com.krypton.common.model.request.FriendRequest;
import lombok.AllArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class FriendshipRequestService implements IFriendshipRequestService
{
  private final UserFeignClient userFeignClient;
  private final FriendRequestFeignClient friendRequestFeignClient;
  private final FriendFeignClient friendFeignClient;
  private final SimpMessagingTemplate simpMessagingTemplate;
  private final UserService userService;

  private final String defaultSocketPath = "/acc/user/";

  @Override
  public void acceptRequest(FriendRequest request)
  {
    var from = request.getFrom();
    var to = request.getTo();

    friendFeignClient.createFriendship(from.getId().toString(), to.getId().toString());

    if (userService.areFriends(from, to))
    {
      delete(request);

      // sending to each user other one as friend
      simpMessagingTemplate.convertAndSend(defaultSocketPath + from.getId().toString() + "/receive/new-friend", to);
      simpMessagingTemplate.convertAndSend(defaultSocketPath + to.getId().toString() + "/receive/new-friend", from);
    }
  }

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
        } else
          {
          simpMessagingTemplate.convertAndSend(defaultSocketPath + toUser.get().getId() + "/receive/friend-request", request.get());
        }
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
        .getFriendRequests(to)
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
    deleteById(request.getId());
  }

  @Override
  public void deleteById(UUID id)
  {
    friendRequestFeignClient.delete(id);
  }

  private void addToUser(FriendRequest request)
  {
    userFeignClient.addFriendRequest(request);
  }
}