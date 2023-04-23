package com.ciras.reservation.util;

import com.ciras.reservation.authentication.model.Role;
import com.ciras.reservation.authentication.model.User;
import org.springframework.security.core.context.SecurityContextHolder;


public class SecurityUtil {
    public static User getUser() {
        return ((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
    }

    public static boolean isAdmin() {
        return getUser().getAuthorities().contains(Role.ADMIN);
    }
}
