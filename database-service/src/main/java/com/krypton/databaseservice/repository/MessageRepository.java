package com.krypton.databaseservice.repository;

import com.krypton.common.model.message.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface MessageRepository extends JpaRepository<ChatMessage, UUID>
{
  @Query(value = "select * from chat_message where chat_message.text =: text", nativeQuery = true)
  Optional<ChatMessage> findByText(@Param("text") String text);
}