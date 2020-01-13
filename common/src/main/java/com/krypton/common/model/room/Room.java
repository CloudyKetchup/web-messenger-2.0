package com.krypton.common.model.room;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.krypton.common.model.BaseEntity;
import com.krypton.common.model.message.ChatMessage;
import com.krypton.common.model.user.User;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@ToString(exclude = {"participants", "messages"})
@Entity
@Table(name = "chat_room")
public class Room extends BaseEntity
{
    @Column
    private String name;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<ChatMessage> messages = new HashSet<>();

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "chat_room_participants",
            joinColumns = { @JoinColumn(name = "room_id") },
            inverseJoinColumns = { @JoinColumn(name = "user_id") })
    @JsonIgnore
    private Set<User> participants = new HashSet<>();

    public Room() {}

    public Room(String name)
    {
        this.name = name;
    }
}
