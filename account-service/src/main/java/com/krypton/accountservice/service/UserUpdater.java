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
    userFeignClient.setStatus(id.toString(), status);

    userFeignClient.find(id).ifPresent(updated -> sendUpdateToAllFriends(id.toString(), updated));
  }

  public void setProfileImage(String id, String imageId)
  {
    userFeignClient.setProfileImage(id, imageId);

    userFeignClient.find(UUID.fromString(id)).ifPresent(updated -> sendUpdateToAllFriends(id, updated));
  }

  private void sendUpdateToAllFriends(String id, Object object)
  {
    simpMessagingTemplate.convertAndSend("/acc/user/" + id + "/friend/updated", object);
  }
}