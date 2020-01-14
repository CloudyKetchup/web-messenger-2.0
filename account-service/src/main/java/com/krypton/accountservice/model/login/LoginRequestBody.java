package com.krypton.accountservice.model.login;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class LoginRequestBody
{
    private String email;
    private String password;

    public LoginRequestBody(String email, String password)
    {
        this.email = email;
        this.password = password;
    }
}
