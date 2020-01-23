package com.krypton.accountservice.feign;

import com.krypton.accountservice.config.FeignConfig;
import com.krypton.common.model.user.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@FeignClient(name = "database-service", path = "/user", configuration = FeignConfig.class)
public interface UserFeignClient
{
    @PostMapping("/save")
    Optional<User> save(@RequestBody User user);

    @GetMapping("/get")
    Optional<User> find(@RequestParam UUID id);

    @GetMapping(value = "/get", params = "nick")
    Optional<User> findByNick(@RequestParam("nick") String nick);

    @GetMapping(value = "/get", params = "email")
    Optional<User> findByEmail(@RequestParam("email") String email);

    @GetMapping("/get/friends")
    Set<User> getFriends(@RequestParam String id);

    @GetMapping(value = "/search", params = "query")
    Set<User> search(@RequestParam String query);
}
