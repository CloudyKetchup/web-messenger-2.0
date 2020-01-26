package com.krypton.databaseservice.controller;

import com.krypton.common.model.request.FriendRequest;
import com.krypton.databaseservice.service.IModelService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/user/request/friendship")
public class FriendRequestController extends EntityController<FriendRequest, UUID>
{
  public FriendRequestController(IModelService<FriendRequest, UUID> service)
  {
    super(service);
  }
}
