package com.krypton.databaseservice.service.room;

import com.krypton.common.model.room.Room;
import com.krypton.common.model.message.ChatMessage;
import com.krypton.databaseservice.repository.RoomRepository;
import com.krypton.databaseservice.service.message.IChatMessageRepoService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Stream;

@Service
@AllArgsConstructor
public class RoomRepoService implements IRoomRepoService
{
	private final RoomRepository roomRepository;
	private final IChatMessageRepoService chatMessageRepoService;

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

	@Override
	public ChatMessage addMessage(Room room, ChatMessage message)
	{
	  var savedMessage = chatMessageRepoService.save(message);

		room.getMessages().add(savedMessage);

		roomRepository.save(room);

		return savedMessage;
	}

	@Override
	public Set<ChatMessage> getMessages(UUID id) {
		var room = find(id);

		if (room.isPresent())
		{
			return room.get().getMessages();
		}
		return new HashSet<>();
	}

	@Override
	public Stream<ChatMessage> getMessagesAsStream(UUID id) {
		var room = find(id);

		return room.map(value -> value.getMessages()
			.stream()
			.sorted((m1, m2) -> m1.getId().compareTo(m2.getId())))
			.orElse(null);
	}

	@Override
  public void deleteMessage(Room room, ChatMessage message)
  {
  	room.getMessages().removeIf(m -> m.equals(message));

  	roomRepository.save(room);
  }
}
