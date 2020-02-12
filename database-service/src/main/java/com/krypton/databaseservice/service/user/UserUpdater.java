package com.krypton.databaseservice.service.user;

import com.krypton.common.model.media.Image;
import com.krypton.common.model.user.UserStatus;
import com.krypton.databaseservice.repository.UserRepository;
import com.krypton.databaseservice.service.image.IImageService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@AllArgsConstructor
public class UserUpdater
{
  private final UserRepository userRepository;
  private final IImageService imageService;

  public void setStatus(UUID id, UserStatus status)
  {
    var user = userRepository.findById(id);

    user.ifPresent(u ->
    {
      u.setStatus(status);

      userRepository.save(u);
    });
  }

  public void assignProfileImage(UUID id, UUID imageId)
  {
    var user = userRepository.findById(id);

    user.ifPresent(u ->
    {
      var image = imageService.find(imageId);

      image.ifPresent(i ->
      {
        u.setProfileImage(i);

        userRepository.save(u);
      });
    });
  }
}
