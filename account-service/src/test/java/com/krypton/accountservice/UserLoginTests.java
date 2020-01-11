package com.krypton.accountservice;

import com.krypton.accountservice.model.login.LoginRequestBody;
import com.krypton.accountservice.service.UserService;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest
@RunWith(SpringRunner.class)
public class UserLoginTests
{

    @Autowired
    private UserService userService;

    @Test
    public void login()
    {
        var loginBody = LoginRequestBody.builder()
                .email("maxdodon25@gmail.com")
                .password("1708")
                .build();

        var resp = userService.login(loginBody);

        System.err.println(resp);
    }
}
