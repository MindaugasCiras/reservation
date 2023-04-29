package com.ciras.reservation.reservations.model;

import com.ciras.reservation.authentication.model.User;
import com.ciras.reservation.room.model.Room;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.math.BigInteger;
import java.util.Date;

@Entity
@Getter
@Setter
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private Date bookedFrom;
    @Column(nullable = false)
    private Date bookedTo;
    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    private String comment;
    private boolean breakfast;
    private boolean dailyCleaning;
    private BigInteger price;
}
