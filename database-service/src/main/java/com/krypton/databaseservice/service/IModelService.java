package com.krypton.databaseservice.service;

import java.util.Optional;

public interface IModelService<E, ID>
{
    Optional<E> find(ID id);

    E save(E model);

    Iterable<E> saveAll(Iterable<E> entities);

    void delete(E model);

    boolean exists(ID id);
}
