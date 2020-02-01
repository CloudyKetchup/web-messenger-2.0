package com.krypton.databaseservice.service.user;

import com.krypton.common.model.request.FriendRequest;
import com.krypton.common.model.room.Room;
import com.krypton.common.model.user.Friend;
import com.krypton.common.model.user.User;
import com.krypton.databaseservice.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.validation.constraints.NotBlank;
import java.util.*;
import java.util.stream.Stream;

@Service
@AllArgsConstructor
public class UserRepoService implements IUserRepoService
{
    private final UserRepository repository;

    @Override
    public Optional<User> findByNick(String nick)
    {
        return repository.findByNick(nick);
    }

    @Override
    public Optional<User> findByEmail(String email)
    {
        return repository.findByEmail(email);
    }

    @Override
    public Stream<Friend> getFriendsAsStream(UUID id) {
        var user = find(id);

        return user.map(u -> u.getFriends()
          .stream()
          .sorted((f1, f2) -> f1.getId().compareTo(f2.getId())))
          .orElse(null);
    }

    @Override
    public Set<Friend> getFriends(UUID id) {
        var user = find(id);

        if (user.isPresent())
        {
            return user.get().getFriends();
        }
        return new HashSet<>();
    }

    @Override
    public Optional<User> find(UUID uuid)
    {
        return repository.findById(uuid);
    }

    @Override
    public User save(User model)
    {
        return repository.save(model);
    }

    @Override
    public Iterable<User> saveAll(Iterable<User> entities)
    {
        return repository.saveAll(entities);
    }

    @Override
    public void delete(User model)
    {
        repository.delete(model);
    }

    @Override
    public boolean exists(UUID uuid)
    {
        return repository.findById(uuid).isPresent();
    }

    @Override
    public Set<User> getFriendsAsUsers(UUID id)
    {
        var user = find(id);
        var friends = new HashSet<User>();

        user.ifPresent(value -> value.getFriends().forEach(friend -> friends.add(friend.getTarget())));

        return friends;
    }

    @Override
    public Set<User> search(@NotBlank String query)
    {
        if (query.isBlank()) return new HashSet<>();

        return repository.searchByNick(query);
    }

    @Override
    public void addFriendRequest(FriendRequest request)
    {
        var target = find(request.getTo().getId());

        target.ifPresent(user ->
        {
            user.getFriendRequests().add(request);
            save(user);
        });
    }

    @Override
    public Set<FriendRequest> getFriendRequests(UUID id)
    {
        var user = find(id);

        if (user.isPresent())
        {
            return user.get().getFriendRequests();
        }
        return new HashSet<>();
    }
}