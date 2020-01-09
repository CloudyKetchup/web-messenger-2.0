package com.krypton.messagingservice;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class SocketController
{

    @MessageMapping("/message/{id}")
    @SendTo("/c/message/{id}")
    public Message message(@DestinationVariable  String id, @RequestBody Message message)
    {
        return message;
    }
}
