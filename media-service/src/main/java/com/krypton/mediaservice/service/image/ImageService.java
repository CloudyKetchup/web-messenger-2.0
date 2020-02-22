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

import java.io.File;
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
  private final ImageProcessor imageProcessor;

  public Mono<Image> save(Mono<FilePart> file, String dir)
  {
    return file.flatMap(f ->
    {
      var path = dir + "/" + f.filename();
      var fileData = fileService.saveFilePart(f, path);

      return Mono.justOrEmpty(fileData.flatMap(data -> imageFeignClient.save(new Image(data))));
    });
  }

  public Mono<Image> saveAsProfilePicture(Mono<FilePart> file, String dir)
  {
    return file.flatMap(f ->
    {
      var path = dir + "/" + f.filename();
      var fileData = fileService.saveFilePart(f, path);

      return Mono.justOrEmpty(fileData.flatMap(data ->
      {
        // if image is not gif we resize it
        if (imageProcessor.getExtension(data.getName())
                .map(extension -> !extension.equals("gif"))
                .get())
        {
          // crop image as square as profile picture should be
          imageProcessor.cropSquareCenter(new File(data.getPath()));
        }
        return imageFeignClient.save(new Image(data));
      }));
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

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(Files.probeContentType(path)))
                .body(bytes);
      } catch (IOException e)
      {
        e.printStackTrace();
      }
    }
    return ResponseEntity.of(Optional.empty());
  }
}