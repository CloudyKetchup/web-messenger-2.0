package com.krypton.accountservice.service;

import com.krypton.accountservice.feign.UserFeignClient;
import com.krypton.accountservice.model.SearchResultUser;
import com.krypton.common.model.request.FriendRequest;
import com.krypton.common.model.room.Room;
import com.krypton.common.model.user.User;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Service
@AllArgsConstructor
public class UserService
{
  private UserFeignClient feignClient;

  public Set<Room> getAllRooms(String id)
  {
    return feignClient.getRooms(id);
  }

  public Set<User> getAllFriends(UUID id)
  {
    var user = feignClient.find(id);

    if (user.isPresent())
    {
      return feignClient.getFriends(user.get().getId().toString());
    }
    return new HashSet<>();
  }

  public Set<FriendRequest> getFriendRequests(String id)
  {
    return feignClient.getFriendRequests(id);
  }

  public Set<SearchResultUser> search(String query, User account)
  {
    var users = feignClient.search(query);
    var searchResult = new HashSet<SearchResultUser>();

    users.parallelStream()
      .forEach(user ->
      {
        var friends = areFriends(account, user);

        searchResult.add(new SearchResultUser(user, friends));
      });
    return searchResult;
  }

  public boolean areFriends(User user1, User user2)
  {
    var user1Friends = feignClient.getFriends(user1.getId().toString());

    return user1Friends.parallelStream().anyMatch(friend -> friend.getId().equals(user2.getId()));
  }
}
