package com.krypton.databaseservice;

import com.krypton.common.model.user.User;
import com.krypton.databaseservice.service.friend.helper.FriendshipHelper;
import com.krypton.databaseservice.service.user.IUserRepoService;
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
    private IUserRepoService userRepoService;

    @Autowired
    private FriendshipHelper friendshipHelper;

    @Test
    public void createFriendship()
    {
        var user1 = createUser("Billy Butcher", "krypton94@yahoo.com", "1111");
        var user2 = createUser("Loli Master", "maxdodon25@gmail.com", "2222");

        friendshipHelper.createFriendship(user1, user2);

        userRepoService.findByNick("Billy Butcher").ifPresent(user -> {
            System.err.println(user.getFriends());
        });
        userRepoService.findByNick("Loli Master").ifPresent(user -> {
            System.err.println(user.getFriends());
        });
    }

    @Test
    public void getFriendUser()
    {
        var user = userRepoService.findByNick("Billy Butcher");
        final User[] friendUser = new User[1];

        user.ifPresent(u -> u.getFriends().forEach(friend -> {
            var t = friend.getTarget();

            if (t.getNick().equals("Loli Master"))
            {
                friendUser[0] = t;
            }
        }));
        System.err.println(friendUser[0]);
    }

    private User createUser(String name, String email, String password)
    {
        var user = new User(name, email, password);

        return userRepoService.save(user);
    }
}