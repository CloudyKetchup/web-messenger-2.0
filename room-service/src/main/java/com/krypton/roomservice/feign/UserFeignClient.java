package com.krypton.roomservice.feign;

import com.krypton.common.model.user.User;
import com.krypton.roomservice.config.FeignConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Optional;

@FeignClient(value = "database-service", url = "http://localhost:8200/user", configuration = FeignConfig.class)
public interface UserFeignClient
{
  @GetMapping(value = "/get", params = "id")
  Optional<User> findById(@RequestParam String id);
}
