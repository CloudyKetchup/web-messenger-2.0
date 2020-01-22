package com.krypton.accountservice;

import com.krypton.accountservice.feign.UserFeignClient;
import com.krypton.accountservice.model.login.LoginRequestBody;
import com.krypton.accountservice.service.AccountService;
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
    private AccountService userService;

    @Autowired
    private UserFeignClient feignClient;

    @Test
    public void find()
    {
        System.err.println(feignClient.findByNick("Billy Butcher"));
    }

    @Test
    public void login()
    {
        var resp = userService.login("maxdodon25@gmail.com", "1708");

        System.err.println(resp);
    }
}
