package com.krypton.roomservice.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class SocketChatMessageBody
{
  private String text;
  private String authorId;
  private String time;

  public SocketChatMessageBody() {}
}
