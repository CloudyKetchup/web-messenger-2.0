package com.krypton.databaseservice.service.room;

import com.krypton.common.model.room.Room;
import com.krypton.common.model.message.ChatMessage;
import com.krypton.databaseservice.service.IModelService;

import java.util.Optional;
import java.util.UUID;

public interface IRoomRepoService extends IModelService<Room, UUID>
{
  ChatMessage addMessage(Room room, ChatMessage message);

  void deleteMessage(Room room, ChatMessage message);
}
