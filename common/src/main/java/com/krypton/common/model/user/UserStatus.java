package com.krypton.common.model.user;

public enum UserStatus
{
    ONLINE("Online"),
    OFFLINE("Offline"),
    DO_NOT_DISTURB("Do not disturb");

    String type;

    UserStatus(String type) { this.type = type; }

    @Override
    public String toString()
    {
        return "UserStatus{" +
                "type='" + type + '\'' +
                '}';
    }
}
