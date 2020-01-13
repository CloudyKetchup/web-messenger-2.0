package com.krypton.roomservice.feign;

import com.krypton.common.model.room.Room;
import com.krypton.roomservice.config.FeignConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@FeignClient(name = "DATABASE-SERVICE", path = "/room", configuration = FeignConfig.class)
public interface RoomFiegnClient
{
    @GetMapping("/get")
    Optional<Room> find(@RequestParam UUID id);

    @PostMapping("/save")
    Room save(@RequestBody Room room);

    @DeleteMapping("/delete")
    void delete(@RequestBody UUID id);
}