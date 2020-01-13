package com.krypton.databaseservice.service.room;

import com.krypton.common.model.room.Room;
import com.krypton.databaseservice.repository.RoomRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class RoomRepoService implements IRoomRepoService
{
    private final RoomRepository roomRepository;

    @Override
    public Optional<Room> find(UUID uuid)
    {
        return roomRepository.findById(uuid);
    }

    @Override
    public Room save(Room model)
    {
        return roomRepository.save(model);
    }

    @Override
    public Iterable<Room> saveAll(Iterable<Room> rooms)
    {
        return roomRepository.saveAll(rooms);
    }

    @Override
    public void delete(Room model)
    {
        roomRepository.delete(model);
    }

    @Override
    public boolean exists(UUID uuid)
    {
        return roomRepository.existsById(uuid);
    }
}
