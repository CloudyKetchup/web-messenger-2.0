package com.krypton.common.model.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.krypton.common.model.room.Room;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Getter
@Setter
@ToString
public class Friend
{
    @Id
    @Column(updatable = false)
    private UUID id = UUID.randomUUID();

    @Column(name = "friendship_id")
    private UUID friendshipID;

    @OneToOne
    private User target;

    @ManyToOne
    @JsonIgnore
    private Room room;

    public Friend() {}

    public Friend(UUID friendshipID, Room room, User target)
    {
        this.friendshipID = friendshipID;
        this.room = room;
        this.target = target;
    }
}