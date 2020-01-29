package com.krypton.databaseservice.service.request.friend;

import com.krypton.common.model.request.FriendRequest;
import com.krypton.databaseservice.repository.FriendRequestRepository;
import com.krypton.databaseservice.service.IModelService;
import com.krypton.databaseservice.service.user.IUserRepoService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class FriendRequestService implements IModelService<FriendRequest, UUID>
{
  private final FriendRequestRepository friendRequestRepository;
  private final IUserRepoService userRepoService;

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
    var toUser = userRepoService.find(model.getTo().getId());

    toUser.ifPresent(user -> {
      user.getFriendRequests().removeIf(request -> request.getId().equals(model.getId()));

      userRepoService.save(user);
    });

    friendRequestRepository.delete(model);
  }

  @Override
  public boolean exists(UUID uuid)
  {
    return friendRequestRepository.existsById(uuid);
  }
}