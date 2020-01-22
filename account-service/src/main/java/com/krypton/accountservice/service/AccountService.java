package com.krypton.accountservice.service;

import com.krypton.accountservice.feign.UserFeignClient;
import com.krypton.accountservice.model.AuthResponse;
import com.krypton.accountservice.model.login.LoginRequestBody;
import com.krypton.accountservice.model.registration.RegisterRequestBody;
import com.krypton.common.model.user.User;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService
{
    private final UserFeignClient feignClient;

    public AuthResponse register(String email, String nick, String password) {
        if (feignClient.findByNick(nick).isPresent())
        {
            return AuthResponse.builder()
                    .message("Nick already taken")
                    .build();
        } else if (feignClient.findByEmail(email).isPresent())
        {
            return AuthResponse.builder()
                    .message("Email already used")
                    .build();
        }
        var acc = feignClient.save(new User(nick, email, password));

        if (acc.isPresent())
        {
            return AuthResponse.builder()
                    .account(acc.get())
                    .message("Registered")
                    .status(HttpStatus.OK)
                    .build();
        }
        return AuthResponse.builder()
                .message("Not registered")
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .build();
    }

    public AuthResponse login(String email, String password)
    {
        var acc = feignClient.findByEmail(email);

        if (acc.isEmpty())
        {
            return AuthResponse.builder()
                    .status(HttpStatus.NOT_FOUND)
                    .message("Email not found")
                    .build();
        } else if (acc.get().getPassword().equals(password))
        {
            return AuthResponse.builder()
                    .message("Authenticated")
                    .status(HttpStatus.OK)
                    .account(acc.get())
                    .build();
        }
        return AuthResponse.builder()
                .message("Not Authenticated")
                .status(HttpStatus.UNAUTHORIZED)
                .build();
    }
}
