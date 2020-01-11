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

    public AuthResponse register(User user) {
        if (feignClient.findByNick(user.getNick()).isPresent())
        {
            return AuthResponse.builder()
                    .message("Account exists")
                    .build();
        }
        var acc = feignClient.save(user);

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

    public AuthResponse register(RegisterRequestBody body)
    {
        var user = new User(body.getNick(), body.getEmail(), body.getPassword());

        return register(user);
    }

    public AuthResponse login(LoginRequestBody body)
    {
        var acc = feignClient.findByEmail(body.getEmail());

        if (acc.isEmpty())
        {
            return AuthResponse.builder()
                    .status(HttpStatus.NOT_FOUND)
                    .message("Email not found")
                    .build();
        } else if (acc.get().getPassword().equals(body.getPassword()))
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
