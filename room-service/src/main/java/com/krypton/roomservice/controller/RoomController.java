package com.krypton.roomservice.controller;

import com.krypton.common.model.message.ChatMessage;
import com.krypton.roomservice.feign.RoomFeignClient;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RequestMapping("/room")
@RestController
@AllArgsConstructor
public class RoomController
{
  private final RoomFeignClient roomFeignClient;

  @GetMapping("/get/messages")
  public Set<ChatMessage> getMessages(@RequestParam String id)
  {
    return roomFeignClient.getMessages(id);
  }
}
