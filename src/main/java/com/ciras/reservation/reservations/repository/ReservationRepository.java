package com.ciras.reservation.reservations.repository;

import com.ciras.reservation.reservations.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    @Query(value = "select r from Reservation r where r.user.id = :id")
    List<Reservation> findWhereUserId(Long id);
}
