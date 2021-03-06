package com.krypton.accountservice.service.request;

import java.util.Optional;
import java.util.UUID;

public interface IRequestService<R, ID>
{
  boolean sent(ID from, ID to);

  Optional<R> save(R request);

  void delete(R request);

  void deleteById(UUID id);
}
