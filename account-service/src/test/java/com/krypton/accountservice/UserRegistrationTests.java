package com.krypton.accountservice;

import com.krypton.accountservice.service.AccountService;
import com.krypton.common.model.user.User;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest
@RunWith(SpringRunner.class)
public class UserRegistrationTests
{
    @Autowired
    private AccountService userService;

    @Test
    public void register()
    {
        var response = userService.register("John Wick", "maxdodon25@gmail.com", "1708");

        System.err.println(response);
    }

    // should not be able to register and return a message like ,,Account already exists,,
    @Test
    public void registerWithExistingNick() {
        var response = userService.register("John Wick", "maxdodon25@gmail.com", "1711");

        assert response.getStatus().equals(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}