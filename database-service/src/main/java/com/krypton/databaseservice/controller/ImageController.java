package com.krypton.databaseservice.controller;

import com.krypton.common.model.media.Image;
import com.krypton.databaseservice.service.IModelService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/image")
public class ImageController extends EntityController<Image, UUID>
{
  public ImageController(IModelService<Image, UUID> service)
  {
    super(service);
  }
}
