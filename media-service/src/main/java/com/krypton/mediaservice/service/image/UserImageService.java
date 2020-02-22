package com.krypton.mediaservice.service.image;

import com.krypton.common.model.media.Image;
import com.krypton.mediaservice.config.StorageConfig;
import lombok.AllArgsConstructor;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@AllArgsConstructor
public class UserImageService
{
  private final ImageService imageService;

  public Mono<Image> saveProfilePicture(Mono<FilePart> filePart, String id)
  {
    return imageService.saveAsProfilePicture(filePart, StorageConfig.IMAGES_PATH + "/" + id);
  }
}
