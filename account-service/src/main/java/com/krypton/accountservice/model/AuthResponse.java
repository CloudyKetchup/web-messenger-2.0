package com.krypton.accountservice.model;

import com.krypton.common.model.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.http.HttpStatus;
import org.springframework.lang.Nullable;

@Builder
@Getter
@Setter
@ToString
public class AuthResponse
{
    private HttpStatus status;
    private String message;
    @Nullable
    @Builder.Default
    private User account = null;
}
