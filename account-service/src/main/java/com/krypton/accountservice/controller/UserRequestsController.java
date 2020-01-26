package com.krypton.accountservice.controller;

import com.krypton.accountservice.service.request.friendship.IFriendshipRequestService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/account/request")
@AllArgsConstructor
public class UserRequestsController
{
  private final IFriendshipRequestService friendshipRequestService;

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
}