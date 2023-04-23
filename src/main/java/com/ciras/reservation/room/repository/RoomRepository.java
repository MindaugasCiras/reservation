package com.ciras.reservation.room.repository;

import com.ciras.reservation.room.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {
    @Query(value = "select ro from Room ro where ro.id not in (select r.id from Room r where exists(select 1 from Reservation res where res.room = r and res.bookedTo <= :to and res.bookedFrom >= :from))")
    List<Room> getAvailableRooms(Date from, Date to);
}
