package com.krypton.roomservice.service.factory;

import com.krypton.common.model.message.ChatMessage;
import com.krypton.roomservice.feign.UserFeignClient;
import com.krypton.roomservice.model.SocketChatMessageBody;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@AllArgsConstructor
@Service
public class ChatMessageFactory
{
  private final UserFeignClient userFeignClient;

  public Optional<ChatMessage> buildFromSocketMessage(SocketChatMessageBody messageBody)
  {
    var user = userFeignClient.find(UUID.fromString(messageBody.getAuthorId()));

    return user.map(value -> new ChatMessage(messageBody.getText(), value));
  }
}
