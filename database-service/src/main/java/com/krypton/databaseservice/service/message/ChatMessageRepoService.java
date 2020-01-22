package com.krypton.databaseservice.service.message;

import com.krypton.common.model.message.ChatMessage;
import com.krypton.databaseservice.repository.MessageRepository;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class ChatMessageRepoService implements IChatMessageRepoService
{
  private final MessageRepository messageRepository;

  @Override
  public ChatMessage modifyText(ChatMessage message, String text)
  {
    message.setText(text);

    return messageRepository.save(message);
  }

  @Override
  public Optional<ChatMessage> modifyText(UUID id, String text)
  {
    var message = find(id);

    message.ifPresent(m -> m.setText(text));

    return message;
  }

  @Override
  public Optional<ChatMessage> find(UUID uuid)
  {
    return messageRepository.findById(uuid);
  }

  @Override
  public ChatMessage save(ChatMessage model)
  {
    return messageRepository.save(model);
  }

  @Override
  public Iterable<ChatMessage> saveAll(Iterable<ChatMessage> entities)
  {
    return messageRepository.saveAll(entities);
  }

  @Override
  public void delete(ChatMessage model)
  {
    messageRepository.delete(model);
  }

  @Override
  public boolean exists(UUID uuid)
  {
    return messageRepository.existsById(uuid);
  }
}