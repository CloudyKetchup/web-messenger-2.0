package com.krypton.databaseservice.service.user;

import com.krypton.common.model.user.User;
import com.krypton.databaseservice.service.IModelService;

import javax.validation.constraints.NotBlank;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

public interface IUserRepoService extends IModelService<User, UUID>
{
    Optional<User> findByNick(String nick);

    Optional<User> findByEmail(String email);

    Set<User> getFriends(UUID id);

    Set<User> search(@NotBlank  String query);
}
