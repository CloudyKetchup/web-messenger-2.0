package com.krypton.databaseservice.repository;

import com.krypton.common.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID>
{
    @Query(value = "select * from chat_user where chat_user.nick = :nick", nativeQuery = true)
    Optional<User> findByNick(@Param("nick") String nick);

    @Query(value = "select * from chat_user where chat_user.email = :email", nativeQuery = true)
    Optional<User> findByEmail(@Param("email") String email);

    @Query(value = "select * from chat_user where chat_user.nick like %:nick%", nativeQuery = true)
    Set<User> searchByNick(@Param("nick") String nick);
}
