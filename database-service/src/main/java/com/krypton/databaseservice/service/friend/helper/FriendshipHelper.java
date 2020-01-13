package com.krypton.databaseservice.service.friend.helper;

import com.krypton.common.model.room.Room;
import com.krypton.common.model.user.Friend;
import com.krypton.common.model.user.User;
import com.krypton.databaseservice.service.friend.IFriendRepoService;
import com.krypton.databaseservice.service.room.IRoomRepoService;
import com.krypton.databaseservice.service.user.IUserRepoService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.UUID;

@Service
@AllArgsConstructor
public class FriendshipHelper
{
    private final IRoomRepoService roomRepoService;
    private final IFriendRepoService friendRepoService;
    private final IUserRepoService userRepoService;

    public void createFriendship(User user1, User user2)
    {
        var friendshipID  = UUID.randomUUID();
        var room          = createRoom(user1, user2);
        var user1AsFriend = new Friend(friendshipID, room, user1);
        var user2AsFriend = new Friend(friendshipID, room, user2);

        friendRepoService.saveAll(new ArrayList<>() {{
            add(user1AsFriend);
            add(user2AsFriend);
        }});

        user1.getFriends().add(user2AsFriend);
        user2.getFriends().add(user1AsFriend);

        userRepoService.saveAll(new ArrayList<>() {{
            add(user1);
            add(user2);
        }});
    }

    private Room createRoom(User user1, User user2)
    {
        var room = new Room(user1.getNick() + " - " + user2.getNick());

        roomRepoService.save(room);

        room.getParticipants().add(user1);
        room.getParticipants().add(user2);

        return roomRepoService.save(room);
    }
}
