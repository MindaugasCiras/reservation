package com.ciras.reservation.room;

import com.ciras.reservation.authentication.model.Role;
import com.ciras.reservation.room.model.AddRoomRequest;
import com.ciras.reservation.room.model.Room;
import com.ciras.reservation.room.repository.RoomRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.json.JsonMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.math.BigInteger;
import java.util.List;

import static com.ciras.reservation.util.JsonUtil.toJson;
import static org.hamcrest.Matchers.emptyArray;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.not;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class RoomControllerTest {

    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext context;

    @Autowired
    private RoomRepository roomRepository;

    @BeforeEach
    public void setup() {
        mockMvc = MockMvcBuilders.webAppContextSetup(context).apply(springSecurity()).build();
    }
    private static AddRoomRequest getRoomRequest() {
        AddRoomRequest room = new AddRoomRequest();
        room.setName("Roomy");
        room.setPrice(BigInteger.TEN);
        return room;
    }


    private Room createRoom(String name) {
        Room room = new Room();
        room.setName(name);
        room.setPrice(BigInteger.TEN);
        return roomRepository.save(room);
    }

    @Test
    void getRoomsAdmin() throws Exception {
        createRoom("A room name");
        mockMvc.perform(get("/rooms").with(user("admin").authorities(Role.ADMIN))).andExpect(status().isOk()).andExpect(MockMvcResultMatchers.jsonPath("$", not(emptyArray())));
    }

    @Test
    void getRoomsUserFails() throws Exception {
        mockMvc.perform(get("/rooms").with(user("user").authorities(Role.USER))).andExpect(status().isForbidden());
    }

    @Test
    void addRoomAdmin() throws Exception {
        AddRoomRequest room = getRoomRequest();
        List<Room> all = roomRepository.findAll();
        mockMvc.perform(MockMvcRequestBuilders.post("/rooms").with(user("admin").authorities(Role.ADMIN)).contentType(MediaType.APPLICATION_JSON).content(toJson(room))).andExpect(status().isOk());
        assertEquals(all.size() + 1, roomRepository.findAll().size());
    }

    @Test
    void addRoomUserFails() throws Exception {
        AddRoomRequest room = getRoomRequest();
        mockMvc.perform(MockMvcRequestBuilders.post("/rooms").with(user("user").authorities(Role.USER)).contentType(MediaType.APPLICATION_JSON).content(toJson(room))).andExpect(status().isForbidden());
    }


    @Test
    void updateRoom() throws Exception {
        AddRoomRequest room = getRoomRequest();
        Room roomA = createRoom("ROOM a");
        mockMvc.perform(MockMvcRequestBuilders.put("/rooms/" + roomA.getId()).with(user("admin").authorities(Role.ADMIN)).contentType(MediaType.APPLICATION_JSON).content(toJson(room))).andExpect(status().isOk());
        Room room1 = roomRepository.findById(roomA.getId()).get();
        assertEquals(room.getName(), room1.getName());
    }
    @Test
    void updateRoomUserFails() throws Exception {
        AddRoomRequest room = getRoomRequest();
        mockMvc.perform(MockMvcRequestBuilders.put("/rooms/" + 123).with(user("admin").authorities(Role.USER)).contentType(MediaType.APPLICATION_JSON).content(toJson(room))).andExpect(status().isForbidden());
    }
    @Test
    void deleteRoomUserFails() throws Exception {
        AddRoomRequest room = getRoomRequest();
        mockMvc.perform(MockMvcRequestBuilders.delete("/rooms/" + 123).with(user("admin").authorities(Role.USER)).contentType(MediaType.APPLICATION_JSON).content(toJson(room))).andExpect(status().isForbidden());
    }

    @Test
    void deleteRoom() throws Exception {
        Room roomA = createRoom("ROOM a");
        mockMvc.perform(MockMvcRequestBuilders.delete("/rooms/" + roomA.getId()).with(user("admin").authorities(Role.ADMIN)).contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk());
        assertFalse(roomRepository.findById(roomA.getId()).isPresent());
    }
}