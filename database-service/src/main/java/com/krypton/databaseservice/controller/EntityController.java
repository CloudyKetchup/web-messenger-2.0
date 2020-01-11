package com.krypton.databaseservice.controller;

import com.krypton.common.model.BaseEntity;
import com.krypton.databaseservice.service.IModelService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@AllArgsConstructor
public abstract class EntityController<E extends BaseEntity, ID>
{
    private final IModelService<E, ID> service;

    @GetMapping(value = "/get", params = "id")
    public Optional<E> get(@RequestParam ID id)
    {
        return service.find(id);
    }

    @PostMapping("/save")
    public E save(@RequestBody E entity)
    {
        return service.save(entity);
    }

    @DeleteMapping("/delete")
    public HttpStatus delete(@RequestParam ID id)
    {
        var entity = service.find(id);

        if (entity.isPresent())
        {
            service.delete(entity.get());

            if (!service.exists(id))
            {
                return HttpStatus.OK;
            }
        }
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }
}