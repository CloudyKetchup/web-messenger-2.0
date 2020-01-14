package com.krypton.databaseservice.controller;

import com.krypton.common.model.user.User;
import com.krypton.databaseservice.service.user.IUserRepoService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/user")
public class UserController extends EntityController<User, UUID>
{
    private final IUserRepoService userRepoService;

    public UserController(IUserRepoService service)
    {
        super(service);
        this.userRepoService = service;
    }

    @GetMapping(value = "/get", params = "nick")
    public Optional<User> getByNick(@RequestParam("nick") String nick)
    {
        return userRepoService.findByNick(nick);
    }

    @GetMapping(value = "/get", params = "email")
    public Optional<User> getByEmail(@RequestParam("email") String email)
    {
        return userRepoService.findByEmail(email);
    }
}
