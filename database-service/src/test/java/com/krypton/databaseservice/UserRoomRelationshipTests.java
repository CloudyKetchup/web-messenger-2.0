package com.krypton.databaseservice;

import com.krypton.common.model.room.Room;
import com.krypton.common.model.user.User;
import com.krypton.databaseservice.repository.RoomRepository;
import com.krypton.databaseservice.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest
@RunWith(SpringRunner.class)
public class UserRoomRelationshipTests
{
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Test
    public void createRelationship()
    {
        var user = createUser();
        var room = createRoom();

        user.getRooms().add(room);
        room.getParticipants().add(user);

        userRepository.save(user);

        var updatedUser = userRepository.findById(user.getId());
        var updateRoom = roomRepository.findById(room.getId());

        updatedUser.ifPresent(u -> System.err.println("\nRooms:\n" + u.getRooms()));
        updateRoom.ifPresent(r -> System.err.println("\nUsers\n" + r.getParticipants()));
    }

    private User createUser()
    {
        var user = User.builder()
                    .nick("Hideo Kojima")
                    .password("1111")
                    .build();

        return userRepository.save(user);
    }

    private Room createRoom()
    {
        var room = Room.builder()
                    .name("Test Room1")
                    .build();

        return roomRepository.save(room);
    }
}
