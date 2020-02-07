package com.krypton.databaseservice.service.user;

import com.krypton.common.model.user.UserStatus;
import com.krypton.databaseservice.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@AllArgsConstructor
public class UserUpdater
{
  private final UserRepository userRepository;

  public void setStatus(UUID id, UserStatus status)
  {
    var user = userRepository.findById(id);

    user.ifPresent(u ->
    {
      u.setStatus(status);

      userRepository.save(u);
    });
  }
}
