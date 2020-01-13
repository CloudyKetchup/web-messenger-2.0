package com.krypton.databaseservice.repository;

import com.krypton.common.model.user.Friend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface FriendRepository extends JpaRepository<Friend, UUID>
{
    @Query(value = "select * from friend where friend.friendshipID =:id", nativeQuery = true)
    Optional<Friend> findByFriendshipID(@Param("id") UUID id);
}