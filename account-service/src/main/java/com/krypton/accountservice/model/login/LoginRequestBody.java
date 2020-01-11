package com.krypton.accountservice.model.login;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.lang.Nullable;

@Builder
@Getter
@Setter
@ToString
public class LoginRequestBody
{
    @Nullable
    private String email;
    private String password;
}
