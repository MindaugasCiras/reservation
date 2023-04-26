package com.ciras.reservation.room.model;

import lombok.Data;

import java.math.BigInteger;

@Data
public class AddRoomRequest {
    private String name;
    private double sizeSqm;
    private String imageUrl;
    private BigInteger price;
    private int capacity;
    private int bedCount;
}
