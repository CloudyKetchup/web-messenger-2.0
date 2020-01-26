package com.krypton.databaseservice.service.user;

import com.krypton.common.model.request.FriendRequest;
import com.krypton.common.model.room.Room;
import com.krypton.common.model.user.User;
import com.krypton.databaseservice.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.validation.constraints.NotBlank;
import java.util.*;

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
    public Set<User> getFriends(UUID id)
    {
        var user = find(id);
        var friends = new HashSet<User>();

        user.ifPresent(value -> value.getFriends().forEach(friend -> friends.add(friend.getTarget())));

        return friends;
    }

    @Override
    public Set<Room> getRooms(UUID id)
    {
        var user = find(id);

        if (user.isPresent())
        {
            return user.get().getRooms();
        }
        return new HashSet<>();
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
        var target = request.getTo();

        target.getFriendRequests().add(request);

        save(target);
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
