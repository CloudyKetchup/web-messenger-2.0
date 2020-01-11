package com.krypton.databaseservice.service.user;

import com.krypton.common.model.user.User;
import com.krypton.databaseservice.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

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
    public void delete(User model)
    {
        repository.delete(model);
    }

    @Override
    public boolean exists(UUID uuid)
    {
        return repository.findById(uuid).isPresent();
    }
}
