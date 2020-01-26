package com.krypton.accountservice.feign;

import com.krypton.accountservice.config.FeignConfig;
import org.springframework.cloud.openfeign.FeignClient;

@FeignClient(value = "database-service", path = "/request", configuration = FeignConfig.class)
public interface RequestServiceFeignClient
{
}
