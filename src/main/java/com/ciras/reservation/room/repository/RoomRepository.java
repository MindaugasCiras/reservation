package com.ciras.reservation.room.repository;

import com.ciras.reservation.room.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Long> {
}
