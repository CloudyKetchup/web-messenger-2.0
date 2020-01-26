package com.krypton.accountservice.feign;

import com.krypton.accountservice.config.FeignConfig;
import com.krypton.common.model.notification.FriendRequestNotification;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Optional;

@FeignClient(name = "notification-service", path = "/notification", configuration = FeignConfig.class)
public interface NotificationFeignClient
{
  @PostMapping("/add/friend-notification")
  Optional<FriendRequestNotification> addFriendRequestNotification(@RequestBody FriendRequestNotification notification);
}
