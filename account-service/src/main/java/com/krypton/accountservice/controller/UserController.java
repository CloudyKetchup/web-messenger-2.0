package com.krypton.accountservice.controller;

import com.krypton.accountservice.feign.UserFeignClient;
import com.krypton.accountservice.model.SearchResultUser;
import com.krypton.accountservice.service.UserService;
import com.krypton.common.model.request.FriendRequest;
import com.krypton.common.model.room.Room;
import com.krypton.common.model.user.User;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@RestController
@AllArgsConstructor
public class UserController extends MainController
{
  private final UserFeignClient userFeignClient;
  private final UserService userService;

  @GetMapping("/get/friends")
  public Set<User> getFriends(@RequestParam String id)
  {
    return userService.getAllFriendsAsUsers(id);
  }

  @GetMapping("/get/friend-requests")
  public Set<FriendRequest> getFriendRequests(@RequestParam String id)
  {
    return userService.getFriendRequests(id);
  }

  @GetMapping("/get/room")
  public Optional<Room> getRoomByFriend(@RequestParam String userId, @RequestParam String friendId)
  {
    return userService.getRoomByFriend(UUID.fromString(userId), UUID.fromString(friendId));
  }

  @GetMapping(value = "/search", params = "query")
  public Set<User> search(@RequestParam String query)
  {
    return userFeignClient.search(query);
  }

  @GetMapping(value = "/search", params = {"query", "acc"})
  public Set<SearchResultUser> search(@RequestParam String query, @RequestParam String acc)
  {
    var user = userFeignClient.find(UUID.fromString(acc));

    if (user.isEmpty()) return new HashSet<>();

    return userService.search(query, user.get());
  }
}