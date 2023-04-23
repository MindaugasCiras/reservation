package com.ciras.reservation.room.model;

import lombok.Data;

@Data
public class AddRoomRequest {
    private String name;
    private double sizeSqm;
    private int capacity;
    private int bedCount;
}
