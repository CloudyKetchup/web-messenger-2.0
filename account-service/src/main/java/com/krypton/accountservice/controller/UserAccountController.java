package com.krypton.accountservice.controller;

import com.krypton.accountservice.model.AuthResponse;
import com.krypton.accountservice.model.login.LoginRequestBody;
import com.krypton.accountservice.model.registration.RegisterRequestBody;
import com.krypton.accountservice.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@AllArgsConstructor
public class UserAccountController extends MainController
{
    private final UserService userService;

    @PostMapping("/register")
    public Mono<AuthResponse> register(@ModelAttribute Mono<RegisterRequestBody> form)
    {
        return form.map(body -> {
            if (body.getEmail()    != null
                &&
                body.getNick()     != null
                &&
                body.getPassword() != null)
            {
                return userService.register(body);
            }
            return AuthResponse.builder()
                    .message("Null values")
                    .status(HttpStatus.BAD_REQUEST)
                    .build();
        });
    }

    @GetMapping("/login")
    public Mono<AuthResponse> login(@ModelAttribute Mono<LoginRequestBody> form)
    {
        return form.map(body -> {
            if (body.getEmail() != null && body.getPassword() != null)
            {
                return userService.login(body);
            }
            return AuthResponse.builder()
                    .message("Null values")
                    .status(HttpStatus.BAD_REQUEST)
                    .build();
        });
    }

    @GetMapping(value = "/login", params = {"email", "password"})
    public Mono<AuthResponse> login(@RequestParam String email, @RequestParam String password)
    {
        if (email != null && password != null)
        {
            return login(Mono.just(new LoginRequestBody(email, password)));
        }
        return Mono.just(AuthResponse.builder()
                .message("Null values")
                .status(HttpStatus.BAD_REQUEST)
                .build());
    }
}
