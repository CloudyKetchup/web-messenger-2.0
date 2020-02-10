package com.krypton.mediaservice.controller.image;

import com.krypton.common.model.media.Image;
import com.krypton.mediaservice.service.image.UserImageService;
import lombok.AllArgsConstructor;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/image")
@AllArgsConstructor
public class UserImageController
{
  private final UserImageService userImageService;

  @PostMapping("/save/profile")
  public Mono<Image> saveProfileImage(@RequestPart("file") Mono<FilePart> file, @RequestParam String id)
  {
    return userImageService.saveProfilePicture(file, id);
  }
}