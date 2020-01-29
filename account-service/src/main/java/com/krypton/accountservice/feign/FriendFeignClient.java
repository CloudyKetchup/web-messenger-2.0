package com.krypton.accountservice.feign;

import com.krypton.accountservice.config.FeignConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(contextId = "database-service.friend", value = "DATABASE-SERVICE", path = "/friend", configuration = FeignConfig.class)
public interface FriendFeignClient
{
  @PostMapping(value = "/create-friendship", params = {"id1", "id2"})
  void createFriendship(@RequestParam String id1, @RequestParam String id2);
}
