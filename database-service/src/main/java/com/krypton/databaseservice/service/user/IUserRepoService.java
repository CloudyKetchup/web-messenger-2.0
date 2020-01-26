package com.krypton.databaseservice.service.user;

import com.krypton.common.model.request.FriendRequest;
import com.krypton.common.model.room.Room;
import com.krypton.common.model.user.User;
import com.krypton.databaseservice.service.IModelService;

import javax.validation.constraints.NotBlank;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

public interface IUserRepoService extends IModelService<User, UUID>
{
    Optional<User> findByNick(String nick);

    Optional<User> findByEmail(String email);

    Set<User> getFriends(UUID id);

    Set<Room> getRooms(UUID id);

    Set<User> search(@NotBlank  String query);

    void addFriendRequest(FriendRequest request);

    Set<FriendRequest> getFriendRequests(UUID id);
}
