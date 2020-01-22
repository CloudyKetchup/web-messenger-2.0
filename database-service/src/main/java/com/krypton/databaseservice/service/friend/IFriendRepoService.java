package com.krypton.databaseservice.service.friend;

import com.krypton.common.model.user.Friend;
import com.krypton.databaseservice.service.IModelService;

import java.util.Optional;
import java.util.UUID;

public interface IFriendRepoService extends IModelService<Friend, UUID>
{
    Optional<Friend> findByFriendshipID(UUID id);
}
