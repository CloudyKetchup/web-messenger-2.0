package com.krypton.common.model.request;

import com.krypton.common.model.BaseEntity;
import com.krypton.common.model.user.User;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.OneToOne;

@Getter
@Setter
@ToString
@Entity
public class FriendRequest extends BaseEntity
{
  @OneToOne
  private User from;

  @OneToOne
  private User to;

  private String text;

  public FriendRequest() {}

  public FriendRequest(User from, User to)
  {
    this.from = from;
    this.to = to;
    this.text = "You got a friend request from " + from.getNick();
  }
}