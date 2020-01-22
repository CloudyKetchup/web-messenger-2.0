package com.krypton.roomservice.feign;

import com.krypton.common.model.room.Room;
import com.krypton.common.model.message.ChatMessage;
import com.krypton.roomservice.config.FeignConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@FeignClient(name = "DATABASE-SERVICE", path = "/room", configuration = FeignConfig.class)
public interface RoomFeignClient
{
    @GetMapping("/get")
    Optional<Room> find(@RequestParam UUID id);

    @GetMapping("/get/all")
    Set<Room> getAllRooms(@RequestBody UUID id);

    @PostMapping("/save")
    Room save(@RequestBody Room room);

    @DeleteMapping("/delete")
    void delete(@RequestBody UUID id);

    @PutMapping("/message/add")
    Optional<ChatMessage> addMessage(@RequestBody ChatMessage message, @RequestParam String room);
}
