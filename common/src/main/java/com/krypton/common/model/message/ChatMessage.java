package com.krypton.common.model.message;

import com.krypton.common.model.BaseEntity;
import com.krypton.common.model.user.User;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToOne;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
@Setter
@ToString
@Entity
public class ChatMessage extends BaseEntity
{
    @Column
    private String text;
    @OneToOne
    private User author;
    @Column
    private String time;
    @Column
    private ChatMessageStatus status = ChatMessageStatus.UNREAD;

    public ChatMessage() {}

    public ChatMessage(String text, User author)
    {
        this.text = text;
        this.author = author;
        this.time = DateTimeFormatter.ofPattern("HH:mm").format(LocalDateTime.now());
    }
}
