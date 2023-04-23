package com.ciras.reservation.reservations.model;

import lombok.Data;

import java.util.Date;

@Data
public class AddReservationRequest {
    private Date bookedFrom;
    private Date bookedTo;
    private Long roomId;
    private String comment;
    private boolean breakfast;
    private boolean dailyCleaning;
}
