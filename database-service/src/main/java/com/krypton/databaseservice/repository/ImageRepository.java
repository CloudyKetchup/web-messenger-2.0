package com.krypton.databaseservice.repository;

import com.krypton.common.model.media.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface ImageRepository extends JpaRepository<Image, UUID>
{
  @Query(value = "select * from image where image.path =: path", nativeQuery = true)
  Optional<Image> findByPath(@Param("path") String path);
}
