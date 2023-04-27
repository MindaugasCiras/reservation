package com.ciras.reservation.room;

import com.ciras.reservation.room.model.AddRoomRequest;
import com.ciras.reservation.room.model.Room;
import com.ciras.reservation.room.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/rooms")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<Room> getRooms() {
        return roomService.getAllRooms();
    }

    @GetMapping("/available")
    public List<Room> getAvailableRooms(@RequestParam @DateTimeFormat(pattern="yyyy-MM-dd") Date from, @RequestParam @DateTimeFormat(pattern="yyyy-MM-dd") Date to) {
        return roomService.getAvailableRooms(from, to);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Room addRoom(@RequestBody AddRoomRequest addRoomRequest) {
        return roomService.addRoom(addRoomRequest);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Room updateRoom(@PathVariable Long id, @RequestBody AddRoomRequest addRoomRequest) {
        return roomService.updateRoom(id, addRoomRequest);
    }

    @GetMapping("/{id}")
    public Room getRoom(@PathVariable Long id) {
        return roomService.getRoom(id);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteRoom(@PathVariable Long id) {
        roomService.deleteRoom(id);
    }
}
