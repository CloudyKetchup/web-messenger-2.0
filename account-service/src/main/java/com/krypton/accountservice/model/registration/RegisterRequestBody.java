package com.krypton.accountservice.model.registration;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class RegisterRequestBody
{
    private String nick;
    private String email;
    private String password;

    public RegisterRequestBody(String nick, String email, String password)
    {
        this.nick = nick;
        this.email = email;
        this.password = password;
    }
}
