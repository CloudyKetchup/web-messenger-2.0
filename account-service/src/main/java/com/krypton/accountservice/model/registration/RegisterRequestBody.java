package com.krypton.accountservice.model.registration;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
public class RegisterRequestBody
{
    @NotNull
    private String nick;
    @NotNull
    private String email;
    @NotNull
    private String password;

    public RegisterRequestBody(String nick, String email, String password)
    {
        this.nick = nick;
        this.email = email;
        this.password = password;
    }
}
