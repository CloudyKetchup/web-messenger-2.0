package com.krypton.accountservice.controller;

import com.krypton.accountservice.feign.FriendRequestFeignClient;
import com.krypton.accountservice.service.request.friendship.IFriendshipRequestService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/account/request")
@AllArgsConstructor
public class FriendRequestController
{
  private final IFriendshipRequestService friendshipRequestService;
  private final FriendRequestFeignClient friendRequestFeignClient;

  @PostMapping(value = "/friendship/send", params = {"from", "to"})
  public HttpStatus sendFriendRequest(@RequestParam String from, @RequestParam String to)
  {
    if (from != null && to != null)
    {
      friendshipRequestService.send(from, to);

      if (friendRequestSent(from, to))
        return HttpStatus.OK;
    }
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }

  @GetMapping(value = "/friendship/sent", params = {"from", "to"})
  public Boolean friendRequestSent(@RequestParam String from, @RequestParam String to)
  {
    return friendshipRequestService.sent(from, to);
  }

  @PostMapping("/friendship/accept")
  public void acceptFriendRequest(@RequestParam String id)
  {
    var request = friendRequestFeignClient.findById(UUID.fromString(id));

    request.ifPresent(friendshipRequestService::acceptRequest);
  }

  @DeleteMapping(value = "/delete/friend-request", params = "id")
  public void deleteFriendRequest(@RequestParam String id)
  {
    friendshipRequestService.deleteById(UUID.fromString(id));
  }
}