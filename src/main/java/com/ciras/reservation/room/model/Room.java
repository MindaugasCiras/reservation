package com.ciras.reservation.room.model;

import com.ciras.reservation.reservations.model.Reservation;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.Set;

@Entity
@Getter
@Setter
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String name;
    private String imageUrl;
    private double sizeSqm;
    private int capacity;
    private int bedCount;

    @JsonIgnore
    @OneToMany(mappedBy = "room")
    private Set<Reservation> reservations;
}
