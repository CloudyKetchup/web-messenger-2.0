package com.krypton.messagingservice;

import com.krypton.common.model.room.Room;
import com.krypton.roomservice.feign.RoomFeignClient;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest
@RunWith(SpringRunner.class)
public class RoomModelTests
{
  @Autowired
  private RoomFeignClient roomFeignClient;

  @Test
  public void createRoom()
  {
    roomFeignClient.save(new Room("test"));
  }
}
