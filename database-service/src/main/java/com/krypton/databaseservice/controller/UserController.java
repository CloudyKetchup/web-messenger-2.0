package com.krypton.databaseservice.controller;

import com.krypton.common.model.request.FriendRequest;
import com.krypton.common.model.user.Friend;
import com.krypton.common.model.user.User;
import com.krypton.common.model.user.UserStatus;
import com.krypton.databaseservice.service.user.IUserRepoService;
import com.krypton.databaseservice.service.user.UserUpdater;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Stream;

@RestController
@RequestMapping("/user")
public class UserController extends EntityController<User, UUID>
{
    private final IUserRepoService userRepoService;
    private final UserUpdater userUpdater;

    public UserController(IUserRepoService service, UserUpdater userUpdater)
    {
        super(service);
        this.userRepoService = service;
        this.userUpdater = userUpdater;
    }

    @GetMapping(value = "/get", params = "nick")
    public Optional<User> getByNick(@RequestParam String nick)
    {
        return userRepoService.findByNick(nick);
    }

    @GetMapping(value = "/get", params = "email")
    public Optional<User> getByEmail(@RequestParam String email)
    {
        return userRepoService.findByEmail(email);
    }

    @GetMapping("/get/friends")
    public Stream<Friend> getFriends(@RequestParam String id)
    {
        return userRepoService.getFriendsAsStream(UUID.fromString(id));
    }

    @GetMapping("/get/friends-as-users")
    public Set<User> getFriendsAsUsers(@RequestParam String id)
    {
        return userRepoService.getFriendsAsUsers(UUID.fromString(id));
    }

    @PostMapping("/update/status")
    public void updateStatus(@RequestParam String id, @RequestParam UserStatus status)
    {
        userUpdater.setStatus(UUID.fromString(id), status);
    }

    @PostMapping("/update/profile-image")
    public void updateProfileImage(@RequestParam String id, @RequestParam String imageId)
    {
        userUpdater.assignProfileImage(UUID.fromString(id), UUID.fromString(imageId));
    }

    @GetMapping(value = "/search", params = "query")
    public Set<User> search(@RequestParam String query)
    {
        return userRepoService.search(query);
    }

    @PutMapping("/add/friend-request")
    public void addFriendRequest(@RequestBody FriendRequest request)
    {
        userRepoService.addFriendRequest(request);
    }

    @GetMapping(value = "/get/friend-requests", params = "id")
    public Set<FriendRequest> getFriendRequests(@RequestParam String id)
    {
        return userRepoService.getFriendRequests(UUID.fromString(id));
    }
}