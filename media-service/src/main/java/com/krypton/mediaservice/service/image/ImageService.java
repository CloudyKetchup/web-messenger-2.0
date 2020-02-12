package com.krypton.mediaservice.service.image;

import com.krypton.common.model.media.Image;
import com.krypton.mediaservice.service.file.FileService;
import com.krypton.mediaservice.feign.ImageFeignClient;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ImageService
{
  private final FileService fileService;
  private final ImageFeignClient imageFeignClient;

  public Mono<Image> save(Mono<FilePart> file, String dir)
  {
    return file.flatMap(f ->
    {
      var path = dir + "/" + f.filename();
      var fileData = fileService.saveFilePart(f, path);

      return Mono.justOrEmpty(fileData.flatMap(data -> imageFeignClient.save(new Image(data))));
    });
  }

  public ResponseEntity<byte[]> getImageAsByteArray(String id)
  {
    var image = imageFeignClient.find(id);

    if (image.isPresent())
    {
      try
      {
        var path = Path.of(image.get().getPath());
        var bytes = Files.readAllBytes(path);
        var extension = getExtension(image.get().getName());

        if (extension.isPresent())
        {
          return ResponseEntity.ok()
                  .contentType(MediaType.parseMediaType(Files.probeContentType(path)))
                  .body(bytes);
        }
      } catch (IOException e)
      {
        e.printStackTrace();
      }
    }
    return ResponseEntity.of(Optional.empty());
  }

  private Optional<String> getExtension(String filename)
  {
    return Optional.ofNullable(filename)
            .filter(f -> f.contains("."))
            .map(f -> f.substring(filename.lastIndexOf(".") + 1));
  }
}