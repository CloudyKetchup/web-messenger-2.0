package com.krypton.accountservice.feign;

import com.krypton.accountservice.config.FeignConfig;
import com.krypton.common.model.media.Image;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Optional;

@FeignClient(contextId = "database-service.image", value = "DATABASE-SERVICE", path = "/image", configuration = FeignConfig.class)
public interface ImageFeignClient
{
  @GetMapping("/get")
  Optional<Image> find(@RequestParam String id);
}
