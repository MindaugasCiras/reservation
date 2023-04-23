package com.ciras.reservation.authentication.service;

import com.ciras.reservation.authentication.model.RegisterRequest;
import com.ciras.reservation.authentication.model.Role;
import com.ciras.reservation.authentication.model.User;
import com.ciras.reservation.authentication.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public void register(RegisterRequest registerRequest) {
        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setAuthorities(Set.of(Role.USER));
        userRepository.save(user);
    }
}
