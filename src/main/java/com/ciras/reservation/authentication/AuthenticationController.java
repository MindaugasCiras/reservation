package com.ciras.reservation.authentication;

import com.ciras.reservation.authentication.model.LoginRequest;
import com.ciras.reservation.authentication.model.RegisterRequest;
import com.ciras.reservation.authentication.model.User;
import com.ciras.reservation.authentication.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final UserService userService;

    @PostMapping("/register")
    public void register(@RequestBody RegisterRequest registerRequest) {
        userService.register(registerRequest);
    }

    @PostMapping("/log-in")
    public User login(@RequestBody LoginRequest loginRequest) {
        return userService.login(loginRequest);
    }


    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/users")
    public List<User> users() {
        return userService.findAllUsers();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}
