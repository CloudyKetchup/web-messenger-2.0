package com.krypton.databaseservice.service.message;

import com.krypton.common.model.message.ChatMessage;
import com.krypton.databaseservice.service.IModelService;

import java.util.Optional;
import java.util.UUID;

public interface IChatMessageRepoService extends IModelService<ChatMessage, UUID>
{
  ChatMessage modifyText(ChatMessage message, String text);

  Optional<ChatMessage> modifyText(UUID id, String text);
}