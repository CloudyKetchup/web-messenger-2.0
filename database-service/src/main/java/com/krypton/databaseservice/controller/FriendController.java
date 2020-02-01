package com.krypton.databaseservice.controller;

import com.krypton.databaseservice.service.friend.helper.FriendshipHelper;
import com.krypton.databaseservice.service.user.IUserRepoService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RequestMapping("/friend")
@RestController
@AllArgsConstructor
public class FriendController
{
  private final FriendshipHelper friendshipHelper;
  private final IUserRepoService userRepoService;

  @PostMapping(value = "/create-friendship", params = {"id1", "id2"})
  public void createFriendship(@RequestParam String id1, @RequestParam String id2)
  {
    var user1 = userRepoService.find(UUID.fromString(id1));
    var user2 = userRepoService.find(UUID.fromString(id2));

    if (user1.isPresent() && user2.isPresent())
    {
      friendshipHelper.createFriendship(user1.get(), user2.get());
    }
  }
}