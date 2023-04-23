package com.ciras.reservation.authentication.model;

import lombok.Data;

@Data
public class RegisterRequest {
    private String username;
    private String password;
}
