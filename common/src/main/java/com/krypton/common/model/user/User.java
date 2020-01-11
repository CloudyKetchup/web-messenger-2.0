package com.krypton.common.model.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.krypton.common.model.BaseEntity;
import com.krypton.common.model.media.Image;
import com.krypton.common.model.room.Room;
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
@ToString(exclude = {"rooms", "friends"})
@Entity
@Table(name = "chat_user")
public class User extends BaseEntity
{
    @Column(nullable = false, unique = true)
    private String nick;
    @Column(nullable = false)
    private String password;

    @OneToOne(mappedBy = "chat_user", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Image profileImage;

    @Builder.Default
    private UserStatus status = UserStatus.OFFLINE;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @Builder.Default
    @JsonIgnore
    private Set<Room> rooms = new HashSet<>();

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "user_friends",
            joinColumns = { @JoinColumn(name = "user_dk") },
            inverseJoinColumns = { @JoinColumn(name = "friend_dk") })
    @Builder.Default
    @JsonIgnore
    private Set<User> friends = new HashSet<>();

    public User() {}

    public User(String nick, String password)
    {
        this.nick = nick;
        this.password = password;
    }
}
