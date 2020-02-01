package com.krypton.databaseservice.service.user;

import com.krypton.common.model.request.FriendRequest;
import com.krypton.common.model.user.Friend;
import com.krypton.common.model.user.User;
import com.krypton.databaseservice.service.IModelService;

import javax.validation.constraints.NotBlank;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Stream;

public interface IUserRepoService extends IModelService<User, UUID>
{
    Optional<User> findByNick(String nick);

    Optional<User> findByEmail(String email);

    Set<Friend> getFriends(UUID id);

    Stream<Friend> getFriendsAsStream(UUID id);

    Set<User> getFriendsAsUsers(UUID id);

    Set<User> search(@NotBlank  String query);

    void addFriendRequest(FriendRequest request);

    Set<FriendRequest> getFriendRequests(UUID id);
}
