package com.krypton.messagingservice.controller;

import com.krypton.common.model.message.ChatMessage;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class MessageController
{

    @MessageMapping("/message/{id}")
    @SendTo("/receive/message/{id}")
    public ChatMessage receiveMessage(@DestinationVariable  String id, @RequestBody ChatMessage message)
    {
        return message;
    }
}