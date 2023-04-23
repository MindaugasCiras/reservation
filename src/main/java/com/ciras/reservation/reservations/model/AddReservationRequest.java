package com.ciras.reservation.reservations.model;

import lombok.Data;

import java.time.LocalDate;

@Data
public class AddReservationRequest {
    private LocalDate from;
    private LocalDate to;
    private Long roomId;
    private String comment;
    private boolean breakfast;
    private boolean dailyCleaning;
}
