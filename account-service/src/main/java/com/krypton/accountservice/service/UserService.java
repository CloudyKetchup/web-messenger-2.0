package com.krypton.accountservice.service;

import com.krypton.accountservice.feign.UserFeignClient;
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
}
