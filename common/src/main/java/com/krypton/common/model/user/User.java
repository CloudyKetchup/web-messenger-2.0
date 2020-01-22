package com.krypton.common.model.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.krypton.common.model.BaseEntity;
import com.krypton.common.model.media.Image;
import com.krypton.common.model.room.Room;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@ToString(exclude = {"rooms", "friends"})
@Entity
@Table(name = "chat_user")
public class User extends BaseEntity
{
    @Column(nullable = false, unique = true)
    private String nick;
    @Column(nullable = false, unique = true)
    private String email;
    @Column(nullable = false)
    private String password;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Image profileImage;

    private UserStatus status = UserStatus.OFFLINE;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Room> rooms = new HashSet<>();

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "user_friends",
            joinColumns = { @JoinColumn(name = "user_id") },
            inverseJoinColumns = { @JoinColumn(name = "friend_id") })
    @JsonIgnore
    private Set<Friend> friends = new HashSet<>();

    public User() {}

    public User(String nick, String email, String password)
    {
        this.nick = nick;
        this.email = email;
        this.password = password;
    }
}
