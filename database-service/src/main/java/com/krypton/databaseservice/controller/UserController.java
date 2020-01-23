package com.krypton.databaseservice.controller;

import com.krypton.common.model.user.User;
import com.krypton.databaseservice.service.user.IUserRepoService;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Set;
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
    public Optional<User> getByNick(@RequestParam String nick)
    {
        return userRepoService.findByNick(nick);
    }

    @GetMapping(value = "/get", params = "email")
    public Optional<User> getByEmail(@RequestParam String email)
    {
        return userRepoService.findByEmail(email);
    }

    @GetMapping("/get/friends")
    public Set<User> getFriends(@RequestParam String id)
    {
        return userRepoService.getFriends(UUID.fromString(id));
    }

    @GetMapping(value = "/search", params = "query")
    public Set<User> search(@RequestParam String query)
    {
        return userRepoService.search(query);
    }
}