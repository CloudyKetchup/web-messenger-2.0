package com.krypton.accountservice.model;

import com.krypton.common.model.user.User;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SearchResultUser
{
  private User user;
  private boolean friends;

  public SearchResultUser() {}

  public SearchResultUser(User user, boolean friends)
  {
    this.user = user;
    this.friends = friends;
  }
}