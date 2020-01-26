package com.krypton.databaseservice.service.request.friend;

import com.krypton.common.model.request.FriendRequest;
import com.krypton.databaseservice.repository.FriendRequestRepository;
import com.krypton.databaseservice.service.IModelService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class FriendRequestService implements IModelService<FriendRequest, UUID>
{
  private final FriendRequestRepository friendRequestRepository;

  @Override
  public Optional<FriendRequest> find(UUID uuid)
  {
    return friendRequestRepository.findById(uuid);
  }

  @Override
  public FriendRequest save(FriendRequest model)
  {
    return friendRequestRepository.save(model);
  }

  @Override
  public Iterable<FriendRequest> saveAll(Iterable<FriendRequest> entities)
  {
    return friendRequestRepository.saveAll(entities);
  }

  @Override
  public void delete(FriendRequest model)
  {
    friendRequestRepository.delete(model);
  }

  @Override
  public boolean exists(UUID uuid)
  {
    return friendRequestRepository.existsById(uuid);
  }
}