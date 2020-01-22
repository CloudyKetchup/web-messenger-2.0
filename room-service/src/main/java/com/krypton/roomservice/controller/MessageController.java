package com.krypton.roomservice.controller;

import com.krypton.common.model.message.ChatMessage;
import com.krypton.roomservice.feign.RoomFeignClient;

import com.krypton.roomservice.model.SocketChatMessageBody;
import com.krypton.roomservice.service.factory.ChatMessageFactory;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Optional;

import lombok.AllArgsConstructor;

@Controller
@AllArgsConstructor
public class MessageController
{
    private final RoomFeignClient roomFeignClient;
    private final ChatMessageFactory chatMessageFactory;

    @MessageMapping("/message/add/room/{id}")
    @SendTo("/c/message/receive/room/{id}")
    public Optional<ChatMessage> receiveMessage(@DestinationVariable String id, @RequestBody SocketChatMessageBody message)
    {
        var chatMessage = chatMessageFactory.buildFromSocketMessage(message);

        if (chatMessage.isPresent())
        {
            return roomFeignClient.addMessage(chatMessage.get(), id);
        }
        return Optional.empty();
    }
}