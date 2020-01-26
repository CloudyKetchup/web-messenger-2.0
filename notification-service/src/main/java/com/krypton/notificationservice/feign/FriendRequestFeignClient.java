package com.krypton.notificationservice.feign;

import com.krypton.common.model.request.FriendRequest;
import com.krypton.notificationservice.config.FeignConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Optional;

@FeignClient(value = "DATABASE-SERVICE", path = "/notification", configuration = FeignConfig.class)
public interface FriendRequestFeignClient
{
  @PostMapping("/save")
  Optional<FriendRequest> save(@RequestBody FriendRequest notification);
}
