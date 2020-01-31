package com.krypton.accountservice.controller;

import com.krypton.accountservice.model.AuthResponse;
import com.krypton.accountservice.service.AccountService;
import com.krypton.accountservice.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

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


}
