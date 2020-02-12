package com.krypton.databaseservice.service.image;

import com.krypton.common.model.media.Image;
import com.krypton.databaseservice.repository.ImageRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class ImageService implements IImageService
{
  private final ImageRepository imageRepository;

  @Override
  public Optional<Image> find(UUID uuid)
  {
    return imageRepository.findById(uuid);
  }

  @Override
  public Image save(Image model)
  {
    return imageRepository.save(model);
  }

  @Override
  public Iterable<Image> saveAll(Iterable<Image> entities)
  {
    return imageRepository.saveAll(entities);
  }

  @Override
  public void delete(Image model)
  {
    imageRepository.delete(model);
  }

  @Override
  public boolean exists(UUID uuid)
  {
    return imageRepository.existsById(uuid);
  }
}
