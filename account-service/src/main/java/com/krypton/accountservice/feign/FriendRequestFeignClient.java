package com.krypton.accountservice.feign;

import com.krypton.accountservice.config.FeignConfig;
import com.krypton.common.model.request.FriendRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@FeignClient(contextId = "database-service.friend.request", value = "DATABASE-SERVICE", path = "/request/friend", configuration = FeignConfig.class)
public interface FriendRequestFeignClient
{
  @GetMapping(value = "/get", params = "id")
  Optional<FriendRequest> findById(@RequestParam UUID id);

  @PostMapping("/save")
  Optional<FriendRequest> save(@RequestBody FriendRequest request);

  @DeleteMapping("/delete")
  HttpStatus delete(@RequestParam UUID id);
}