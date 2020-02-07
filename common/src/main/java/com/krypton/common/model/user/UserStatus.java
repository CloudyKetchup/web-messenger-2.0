package com.krypton.common.model.user;

public enum UserStatus
{
    ONLINE("ONLINE"),
    OFFLINE("OFFLINE"),
    DO_NOT_DISTURB("DO_NOT_DISTURB");

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
