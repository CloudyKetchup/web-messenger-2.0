package com.krypton.accountservice.controller;

import com.krypton.accountservice.model.AuthResponse;
import com.krypton.accountservice.service.AccountService;
import com.krypton.accountservice.service.UserService;
import com.krypton.common.model.room.Room;
import com.krypton.common.model.user.User;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Set;
import java.util.UUID;

@RestController
@AllArgsConstructor
public class UserAccountController extends MainController
{
    private final AccountService accountService;
    private final UserService userService;

    @PostMapping(value = "/register", params = {"nick", "email", "password"})
    public AuthResponse register(@RequestParam String nick, @RequestParam String email, @RequestParam String password)
    {
        if (nick != null && email != null && password != null)
        {
            return accountService.register(email, nick, password);
        }
        return AuthResponse.builder()
                .message("Null values")
                .status(HttpStatus.BAD_REQUEST)
                .build();
    }

    @GetMapping(value = "/login", params = {"email", "password"})
    public AuthResponse login(@RequestParam String email, @RequestParam String password)
    {
        if (email != null && password != null)
        {
            return accountService.login(email, password);
        }
        return AuthResponse.builder()
                .message("Null values")
                .status(HttpStatus.BAD_REQUEST)
                .build();
    }

    @GetMapping("/get/friends")
    public Set<User> getFriends(@RequestParam String id)
    {
        return userService.getAllFriends(UUID.fromString(id));
    }

    @GetMapping("/get/rooms")
    public Set<Room> getRooms(@RequestParam String id)
    {
        return userService.getAllRooms(UUID.fromString(id));
    }
}
