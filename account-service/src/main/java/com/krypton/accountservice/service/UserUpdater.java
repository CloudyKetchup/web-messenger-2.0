package com.krypton.accountservice.service;

import com.krypton.accountservice.feign.UserFeignClient;
import com.krypton.common.model.user.UserStatus;
import lombok.AllArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@AllArgsConstructor
public class UserUpdater
{
  private final UserFeignClient userFeignClient;
  private final SimpMessagingTemplate simpMessagingTemplate;

  public void setStatus(UUID id, UserStatus status)
  {
    var user = userFeignClient.find(id);

    user.ifPresent(u ->
    {
      userFeignClient.setStatus(id.toString(), status);

      userFeignClient.find(id).ifPresent(updated -> sendUpdateToAllFriends(id.toString(), updated));
    });
  }

  private void sendUpdateToAllFriends(String id, Object object)
  {
    simpMessagingTemplate.convertAndSend("/acc/user/" + id + "/friend/updated", object);
  }
}