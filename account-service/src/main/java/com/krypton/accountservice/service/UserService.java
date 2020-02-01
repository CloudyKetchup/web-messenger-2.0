package com.krypton.accountservice.service;

import com.krypton.accountservice.feign.UserFeignClient;
import com.krypton.accountservice.model.SearchResultUser;
import com.krypton.common.model.request.FriendRequest;
import com.krypton.common.model.room.Room;
import com.krypton.common.model.user.Friend;
import com.krypton.common.model.user.User;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Service
@AllArgsConstructor
public class UserService
{
  private UserFeignClient feignClient;

  public Set<User> getAllFriendsAsUsers(UUID id)
  {
    var user = feignClient.find(id);

    if (user.isPresent())
    {
      return feignClient.getFriendsAsUsers(user.get().getId().toString());
    }
    return new HashSet<>();
  }

  public Set<Friend> getFriends(UUID id)
  {
    return feignClient.getFriends(id.toString());
  }

  public Set<FriendRequest> getFriendRequests(UUID id)
  {
    return feignClient.getFriendRequests(id.toString());
  }

  public Set<Room> getRooms(UUID id)
  {
    var rooms = new HashSet<Room>();

    getFriends(id)
      .parallelStream()
      .forEach(friend -> {
        rooms.add(friend.getRoom());
      });

    return rooms;
  }

  public Optional<Room> getRoomByFriend(UUID userId, UUID friendId)
  {
    final Room[] room = new Room[1];

    feignClient.getFriends(userId.toString())
      .parallelStream()
      .filter(f -> f.getTarget().getId().equals(friendId))
      .findFirst()
      .ifPresent(f -> room[0] = f.getRoom());

    return Optional.ofNullable(room[0]);
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
    var user1Friends = feignClient.getFriendsAsUsers(user1.getId().toString());

    return user1Friends.parallelStream().anyMatch(friend -> friend.getId().equals(user2.getId()));
  }
}
