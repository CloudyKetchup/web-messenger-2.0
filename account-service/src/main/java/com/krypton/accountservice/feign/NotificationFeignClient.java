package com.krypton.accountservice.feign;

import com.krypton.accountservice.config.FeignConfig;
import com.krypton.common.model.request.FriendRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "notification-service", path = "/notification", configuration = FeignConfig.class)
public interface NotificationFeignClient
{
  @PostMapping("/friend/send/friend-request")
  void sendFriendRequestNotification(@RequestBody FriendRequest notification);
}
