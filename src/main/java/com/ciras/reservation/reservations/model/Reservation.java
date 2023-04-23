package com.ciras.reservation.reservations.model;

import com.ciras.reservation.room.model.Room;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.time.LocalDate;

@Entity
@Getter
@Setter
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private LocalDate from;
    private LocalDate to;
    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;
    private String comment;
    private boolean breakfast;
    private boolean dailyCleaning;
}
