package com.krypton.mediaservice.feign;

import com.krypton.common.model.media.Image;
import com.krypton.mediaservice.config.FeignConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@FeignClient(contextId = "database-service.image", value = "DATABASE-SERVICE", path = "/image", configuration = FeignConfig.class)
public interface ImageFeignClient
{
  @GetMapping("/get")
  Optional<Image> find(@RequestParam String id);

  @PostMapping("/save")
  Optional<Image> save(@RequestBody Image image);

  @DeleteMapping("/delete")
  void delete(@RequestParam String id);
}
