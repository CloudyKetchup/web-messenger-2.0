package com.krypton.roomservice.controller;

import com.krypton.common.model.message.ChatMessage;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/message")
public class MessageController
{

    @MessageMapping("/add/room/{id}")
    @SendTo("/receive/room/{id}")
    public ChatMessage receiveMessage(@DestinationVariable  String id, @RequestBody ChatMessage message)
    {
        return message;
    }
}