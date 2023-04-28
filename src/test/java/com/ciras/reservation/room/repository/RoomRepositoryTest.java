package com.ciras.reservation.room.repository;

import com.ciras.reservation.authentication.repository.UserRepository;
import com.ciras.reservation.reservations.model.Reservation;
import com.ciras.reservation.reservations.repository.ReservationRepository;
import com.ciras.reservation.room.model.Room;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import javax.persistence.EntityManager;
import java.math.BigInteger;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import static com.ciras.reservation.util.DateUtil.getDate;
import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(SpringExtension.class)
@DataJpaTest
class RoomRepositoryTest {

    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private ReservationRepository reservationRepository;
    @Autowired
    private UserRepository userRepository;

    private static Room createRoom(String name) {
        Room room = new Room();
        room.setName(name);
        room.setPrice(BigInteger.TEN);
        return room;
    }
    @Test
    void returnsRoomWithoutReservation() throws ParseException {
        Room room = createRoom("A name");
        Room room1 = createRoom("A name1");
        roomRepository.save(room);
        Long id1 = roomRepository.save(room1).getId();
        testForPeriodReturnsOneResponse(// |*__|*
                getDate("2024-03-01"), getDate("2024-03-10"),
                getDate("2024-03-02"), getDate("2024-03-12"),
                room, id1);
        testForPeriodReturnsOneResponse(// |*__*|
                getDate("2024-03-01"), getDate("2024-03-10"),
                getDate("2024-03-02"), getDate("2024-03-09"),
                room, id1);
        testForPeriodReturnsOneResponse( // *|__*|
                getDate("2024-03-02"), getDate("2024-03-10"),
                getDate("2024-03-01"), getDate("2024-03-09"),
                room, id1);
        testForPeriodReturnsOneResponse( // ==
                getDate("2024-03-02"), getDate("2024-03-10"),
                getDate("2024-03-02"), getDate("2024-03-10"),
                room, id1);
    }

    private void testForPeriodReturnsOneResponse(Date bookFrom, Date bookTo, Date searchFrom, Date searchTo, Room bookedRoom, Long returnedId) {
        Reservation reservation = new Reservation();
        reservation.setRoom(bookedRoom);
        reservation.setBookedFrom(bookFrom);
        reservation.setBookedTo(bookTo);
        reservation.setUser(userRepository.findAll().get(0));
        reservationRepository.save(reservation);
        List<Room> availableRooms = roomRepository.getAvailableRooms(searchFrom, searchTo);
        assertEquals(1, availableRooms.size());
        assertEquals(returnedId, availableRooms.get(0).getId());
        reservationRepository.delete(reservation);
    }


}