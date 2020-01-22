package com.krypton.roomservice.controller;

import com.krypton.common.model.room.Room;
import com.krypton.roomservice.feign.RoomFeignClient;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;
import java.util.UUID;

@RestController
@AllArgsConstructor
public class RoomController extends MainController
{
    private final RoomFeignClient feignClient;

    @GetMapping("/get/all")
    public Set<Room> getAllRooms(@RequestParam String id)
    {
        return feignClient.getAllRooms(UUID.fromString(id));
    }
}
