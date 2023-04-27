package com.ciras.reservation.authentication.service;

import com.ciras.reservation.authentication.model.LoginRequest;
import com.ciras.reservation.authentication.model.RegisterRequest;
import com.ciras.reservation.authentication.model.Role;
import com.ciras.reservation.authentication.model.User;
import com.ciras.reservation.authentication.repository.UserRepository;
import com.ciras.reservation.reservations.model.Reservation;
import com.ciras.reservation.reservations.repository.ReservationRepository;
import com.ciras.reservation.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Set;

import static org.springframework.security.web.context.HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final HttpServletRequest req;
    private final AuthenticationManager authenticationManager;
    private final ReservationRepository reservationRepository;

    public void register(RegisterRequest registerRequest) {
        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setAuthorities(Set.of(Role.USER));
        userRepository.save(user);
    }

    public User login(LoginRequest loginRequest) {

        UsernamePasswordAuthenticationToken authReq
                = new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword());
        Authentication auth = authenticationManager.authenticate(authReq);

        SecurityContext sc = SecurityContextHolder.getContext();
        sc.setAuthentication(auth);
        HttpSession session = req.getSession(true);
        session.setAttribute(SPRING_SECURITY_CONTEXT_KEY, sc);
        User principal = (User) auth.getPrincipal();
        principal.setPassword("");
        return principal;
    }

    public List<User> findAllUsers() {
        if (SecurityUtil.isAdmin()) {
            User currentUser = SecurityUtil.getUser();
            return userRepository.findAll().stream().filter(user -> !user.getId().equals(currentUser.getId())).peek(user -> user.setPassword("")).toList();
        }
        throw new RuntimeException("Not admin");
    }

    public void deleteUser(Long id) {
        if (SecurityUtil.isAdmin()) {
            List<Reservation> reservations = reservationRepository.findWhereUserId(id);
            reservations.forEach(reservationRepository::delete);
            userRepository.deleteById(id);
        } else {
            throw new RuntimeException("Not admin");
        }
    }
}
