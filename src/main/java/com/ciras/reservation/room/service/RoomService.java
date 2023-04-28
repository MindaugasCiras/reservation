package com.ciras.reservation.room.service;

import com.ciras.reservation.room.model.AddRoomRequest;
import com.ciras.reservation.room.model.Room;
import com.ciras.reservation.room.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public Room addRoom(AddRoomRequest addRoomRequest) {
        Room room = new Room();
        BeanUtils.copyProperties(addRoomRequest, room);
        return roomRepository.save(room);
    }

    public Room updateRoom(Long id, AddRoomRequest addRoomRequest) {
        Room room = getRoom(id);
        BeanUtils.copyProperties(addRoomRequest, room);
        return roomRepository.save(room);
    }

    public void deleteRoom(Long id) {
        roomRepository.deleteById(id);
    }

    public Room getRoom(Long id) {
        return roomRepository.findById(id).orElseThrow(() -> new RuntimeException("Room not found"));
    }

    public List<Room> getAvailableRooms(Date from, Date to) {
        return roomRepository.getAvailableRooms(from, to);
    }
}
