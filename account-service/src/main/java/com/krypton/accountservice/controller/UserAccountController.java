package com.krypton.accountservice.controller;

import com.krypton.accountservice.model.AuthResponse;
import com.krypton.accountservice.model.login.LoginRequestBody;
import com.krypton.accountservice.model.registration.RegisterRequestBody;
import com.krypton.accountservice.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@AllArgsConstructor
@RequestMapping("/account")
public class UserAccountController
{
    private final UserService userService;

    @PostMapping("/register")
    public Mono<AuthResponse> register(@ModelAttribute Mono<RegisterRequestBody> form)
    {
        return form.map(userService::register);
    }

    @PostMapping("/login")
    public Mono<AuthResponse> login(@ModelAttribute Mono<LoginRequestBody> form)
    {
        return form.map(userService::login);
    }
}
