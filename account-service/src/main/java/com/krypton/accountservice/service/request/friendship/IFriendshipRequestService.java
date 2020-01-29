package com.krypton.accountservice.service.request.friendship;

import com.krypton.accountservice.service.request.IRequestService;
import com.krypton.common.model.request.FriendRequest;

public interface IFriendshipRequestService extends IRequestService<FriendRequest, String>
{
  void acceptRequest(FriendRequest request);

  void send(String from, String to);
}