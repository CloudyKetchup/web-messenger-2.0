package com.krypton.common.model.message;

public enum ChatMessageStatus
{
    READ("Read"),
    UNREAD("Unread");

    private String type;

    ChatMessageStatus(String type)
    {
        this.type = type;
    }

    @Override
    public String toString()
    {
        return "ChatMessageStatus{" +
                "type='" + type + '\'' +
                '}';
    }
}
