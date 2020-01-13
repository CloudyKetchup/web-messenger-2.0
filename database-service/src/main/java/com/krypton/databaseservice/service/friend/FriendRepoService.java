package com.krypton.databaseservice.service.friend;

import com.krypton.common.model.user.Friend;
import com.krypton.databaseservice.repository.FriendRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class FriendRepoService implements IFriendRepoService
{
    private final FriendRepository friendRepository;

    @Override
    public Optional<Friend> findByFriendshipID(UUID id)
    {
        return friendRepository.findByFriendshipID(id);
    }

    @Override
    public Iterable<Friend> saveAll(Iterable<Friend> friends)
    {
        return friendRepository.saveAll(friends);
    }

    @Override
    public Optional<Friend> find(UUID uuid)
    {
        return friendRepository.findById(uuid);
    }

    @Override
    public Friend save(Friend model)
    {
        return friendRepository.save(model);
    }

    @Override
    public void delete(Friend model)
    {
        friendRepository.delete(model);
    }

    @Override
    public boolean exists(UUID uuid)
    {
        return friendRepository.existsById(uuid);
    }
}
