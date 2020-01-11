package com.krypton.databaseservice.service;

import com.krypton.common.model.BaseEntity;

import java.util.Optional;

public interface IModelService<E extends BaseEntity, ID>
{
    Optional<E> find(ID id);

    E save(E model);

    void delete(E model);

    boolean exists(ID id);
}
