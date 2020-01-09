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
class UserModelTests
{
    @Autowired
    private UserRepository userRepository;

    @Test
    public void createAndInsertUser()
    {
        var user = User.builder()
                .nick("Loli Master")
                .password("1708")
                .build();
        var save_u = userRepository.save(user);
        System.err.println(save_u);
    }
}
