package com.krypton.common.model.room;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.krypton.common.model.BaseEntity;
import com.krypton.common.model.message.ChatMessage;
import com.krypton.common.model.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@SuperBuilder
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
    @Builder.Default
    @JsonIgnore
    private Set<ChatMessage> messages = new HashSet<>();

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "room_participants",
            joinColumns = { @JoinColumn(name = "room_dk") },
            inverseJoinColumns = { @JoinColumn(name = "user_dk") })
    @Builder.Default
    @JsonIgnore
    private Set<User> participants = new HashSet<>();

    @Column(name = "is_group")
    @Builder.Default
    private Boolean group = false;

    public Room() {}

    public Room(String name)
    {
        this.name = name;
    }
}
