package com.krypton.databaseservice.service.user;

import com.krypton.common.model.user.User;
import com.krypton.databaseservice.service.IModelService;

import java.util.Optional;
import java.util.UUID;

public interface IUserRepoService extends IModelService<User, UUID>
{
    Optional<User> findByNick(String nick);

    Optional<User> findByEmail(String email);
}
