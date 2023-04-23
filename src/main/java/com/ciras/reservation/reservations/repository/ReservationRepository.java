package com.ciras.reservation.reservations.repository;

import com.ciras.reservation.reservations.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
}
