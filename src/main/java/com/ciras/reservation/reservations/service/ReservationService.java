package com.ciras.reservation.reservations.service;

import com.ciras.reservation.authentication.model.User;
import com.ciras.reservation.reservations.model.AddReservationRequest;
import com.ciras.reservation.reservations.model.Reservation;
import com.ciras.reservation.reservations.repository.ReservationRepository;
import com.ciras.reservation.room.model.Room;
import com.ciras.reservation.room.service.RoomService;
import com.ciras.reservation.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final RoomService roomService;

    public List<Reservation> getAllReservations() {
        if (SecurityUtil.isAdmin()) {

            return reservationRepository.findAll();
        } else {
            User user = SecurityUtil.getUser();
            return reservationRepository.findWhereUserId(user.getId());
        }
    }

    public Reservation addReservation(AddReservationRequest addReservationRequest) {
        Room room = roomService.getRoom(addReservationRequest.getRoomId());
        Reservation reservation = new Reservation();
        BeanUtils.copyProperties(addReservationRequest, reservation);
        reservation.setRoom(room);
        reservation.setUser(SecurityUtil.getUser());
        return reservationRepository.save(reservation);
    }

    public void deleteReservation(Long id) {
        reservationRepository.deleteById(id);
    }

    public Reservation updateReservation(Long id, AddReservationRequest addReservationRequest) {
        Reservation reservation = getReservation(id);
        BeanUtils.copyProperties(addReservationRequest, reservation);
        return reservationRepository.save(reservation);
    }

    public Reservation getReservation(Long id) {
        return reservationRepository.findById(id).orElseThrow(() -> new RestClientException("Reservation not found"));
    }
}
