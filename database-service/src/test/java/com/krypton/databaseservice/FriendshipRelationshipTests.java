package com.krypton.databaseservice;

import com.krypton.common.model.user.User;
import com.krypton.databaseservice.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest
@RunWith(SpringRunner.class)
public class FriendshipRelationshipTests
{
    @Autowired
    private UserRepository userRepository;

    @Test
    public void createRelationship()
    {
        var user1 = createUser("Billy Butcher");
        var user2 = createUser("Loli Master");

        user1.getFriends().add(user2);
        user2.getFriends().add(user1);

        userRepository.save(user1);

        var u1 = userRepository.findByNick("Billy Butcher");
        var u2 = userRepository.findByNick("Loli Master");

        u1.ifPresent(l -> System.err.println(l.getFriends()));
        u2.ifPresent(r -> System.err.println(r.getFriends()));
    }

    private User createUser(String name)
    {
        var user = User.builder()
                    .nick(name)
                    .password("1708")
                    .build();

        return userRepository.save(user);
    }
}
