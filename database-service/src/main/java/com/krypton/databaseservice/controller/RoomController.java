package com.krypton.databaseservice.controller;

import com.krypton.common.model.room.Room;
import com.krypton.common.model.message.ChatMessage;
import com.krypton.databaseservice.service.room.IRoomRepoService;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Stream;

@RestController
@RequestMapping("/room")
public class RoomController extends EntityController<Room, UUID>
{
  private final IRoomRepoService roomRepoService;

  public RoomController(IRoomRepoService roomRepoService)
  {
    super(roomRepoService);
    this.roomRepoService = roomRepoService;
  }

  @PutMapping("/message/add")
  public Optional<ChatMessage> addMessage(@RequestBody ChatMessage message, @RequestParam("room") String roomId)
  {
    var room = roomRepoService.find(UUID.fromString(roomId));
    final ChatMessage[] savedMessage = new ChatMessage[1];

    room.ifPresent(r -> savedMessage[0] = roomRepoService.addMessage(r, message));

    return Optional.of(savedMessage[0]);
  }

  @GetMapping("/get/messages")
  public Stream<ChatMessage> getMessages(@RequestParam("room") String roomId)
  {
    return roomRepoService.getMessagesAsStream(UUID.fromString(roomId));
  }
}
