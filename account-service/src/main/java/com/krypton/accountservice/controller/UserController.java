package com.krypton.accountservice.controller;

import com.krypton.accountservice.feign.UserFeignClient;
import com.krypton.accountservice.model.SearchResultUser;
import com.krypton.accountservice.service.UserService;
import com.krypton.common.model.user.User;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@RestController
@AllArgsConstructor
public class UserController extends MainController
{
  private final UserFeignClient userFeignClient;
  private final UserService userService;

  @GetMapping(value = "/search", params = "query")
  public Set<User> search(@RequestParam String query)
  {
    return userFeignClient.search(query);
  }

  @GetMapping(value = "/search", params = {"query", "acc"})
  public Set<SearchResultUser> search(@RequestParam String query, @RequestParam String acc)
  {
    var user = userFeignClient.find(UUID.fromString(acc));

    if (user.isEmpty()) return new HashSet<>();

    return userService.search(query, user.get());
  }
}