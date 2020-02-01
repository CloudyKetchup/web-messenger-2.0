package com.krypton.databaseservice.service.room;

import com.krypton.common.model.room.Room;
import com.krypton.common.model.message.ChatMessage;
import com.krypton.databaseservice.service.IModelService;

import java.util.Set;
import java.util.UUID;
import java.util.stream.Stream;

public interface IRoomRepoService extends IModelService<Room, UUID>
{
  ChatMessage addMessage(Room room, ChatMessage message);

  Set<ChatMessage> getMessages(UUID id);

  Stream<ChatMessage> getMessagesAsStream(UUID id);

  void deleteMessage(Room room, ChatMessage message);
}
