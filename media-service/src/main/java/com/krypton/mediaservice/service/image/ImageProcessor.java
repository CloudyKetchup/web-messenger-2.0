package com.krypton.mediaservice.service.image;

import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.io.File;
import java.io.IOException;
import java.util.Optional;

@Service
public class ImageProcessor
{
  public void cropSquareCenter(File image)
  {
    try
    {
      var bufferedImage = ImageIO.read(image);
      var height        = bufferedImage.getHeight();
      var width         = bufferedImage.getWidth();
      var extension     = getExtension(image.getName());

      if (extension.isPresent()
          &&
          !extension.get().equals("png")
          &&
          !extension.get().equals("gif")
      ) {
        var crop = bufferedImage.getSubimage((width - height) / 2, 0, height, height);

        ImageIO.write(crop,
                extension.get(),
                image);
      }
    } catch (IOException e)
    {
      e.printStackTrace();
    }
  }

  public Optional<String> getExtension(String filename)
  {
    return Optional.ofNullable(filename)
            .filter(f -> f.contains("."))
            .map(f -> f.substring(filename.lastIndexOf(".") + 1));
  }
}