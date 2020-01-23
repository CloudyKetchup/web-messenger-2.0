package com.krypton.accountservice.service;

import com.krypton.accountservice.feign.UserFeignClient;
import com.krypton.accountservice.model.SearchResultUser;
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
    private final UserFeignClient feignClient;

    public Set<Room> getAllRooms(UUID id)
    {
        var user = feignClient.find(id);
        var rooms = new HashSet<Room>();

        user.ifPresent(u -> u.getFriends()
                        .parallelStream()
                        .forEach(friend -> rooms.add(friend.getRoom())));
        return rooms;
    }

    public Set<User> getAllFriends(UUID id)
    {
        var user = feignClient.find(id);
        var friends = new HashSet<User>();

        user.ifPresent(u -> u.getFriends()
                        .parallelStream()
                        .forEach(f -> friends.add(f.getTarget())));
        return friends;
    }

    public Set<SearchResultUser> search(String query, User account)
    {
        var users = feignClient.search(query);
        var searchResult = new HashSet<SearchResultUser>();

        users.parallelStream().forEach(user -> {
           var friends = areFriends(account, user);

           searchResult.add(new SearchResultUser(user, friends));
        });
        return searchResult;
    }

    public boolean areFriends(User user1, User user2)
    {
        final boolean[] friends = {false};

        user1.getFriends().parallelStream().forEach(friend -> {
            if (friend.getTarget().getId().equals(user2.getId()))
            {
                friends[0] = true;
            }
        });
        return friends[0];
    }
}
