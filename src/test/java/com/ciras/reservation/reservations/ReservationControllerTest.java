package com.ciras.reservation.reservations;

import com.ciras.reservation.authentication.model.Role;
import com.ciras.reservation.authentication.model.User;
import com.ciras.reservation.authentication.repository.UserRepository;
import com.ciras.reservation.reservations.model.AddReservationRequest;
import com.ciras.reservation.reservations.model.Reservation;
import com.ciras.reservation.reservations.repository.ReservationRepository;
import com.ciras.reservation.room.model.Room;
import com.ciras.reservation.room.repository.RoomRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.test.context.TestSecurityContextHolder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.math.BigInteger;
import java.text.ParseException;
import java.util.List;
import java.util.Set;

import static com.ciras.reservation.util.DateUtil.getDate;
import static com.ciras.reservation.util.JsonUtil.toJson;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.testSecurityContext;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ReservationControllerTest {
    public static final String NOT_OWNING_THE_RESERVATION = "Not owning the reservation";
    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext context;

    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private ReservationRepository reservationRepository;
    @Autowired
    private UserRepository userRepository;

    private static Reservation createNewReservation(Room myRoom, User user) throws ParseException {
        Reservation reservation = new Reservation();
        reservation.setRoom(myRoom);
        reservation.setBookedFrom(getDate("2012-01-12"));
        reservation.setBookedTo(getDate("2012-01-15"));
        reservation.setUser(user);
        return reservation;
    }

    private static AddReservationRequest createUpdateReservation(Room myRoom) throws ParseException {
        AddReservationRequest updateReservation = new AddReservationRequest();
        updateReservation.setRoomId(myRoom.getId());
        updateReservation.setBookedFrom(getDate("2012-01-12"));
        updateReservation.setBookedTo(getDate("2012-01-15"));
        String comment = "COMMENT";
        updateReservation.setComment(comment);
        return updateReservation;
    }

    @BeforeEach
    public void setup() {
        mockMvc = MockMvcBuilders.webAppContextSetup(context).apply(springSecurity()).build();
    }

    private Room createRoom(String name) {
        Room room = new Room();
        room.setName(name);
        room.setPrice(BigInteger.TEN);
        return roomRepository.save(room);
    }

    @Test
    void getAllReservations() throws Exception {
    }

    @Test
    void addReservation() throws Exception {
        Room myRoom = createRoom("My room");
        List<Reservation> all = reservationRepository.findAll();
        AddReservationRequest addReservationRequest = new AddReservationRequest();
        addReservationRequest.setRoomId(myRoom.getId());
        addReservationRequest.setBookedFrom(getDate("2012-01-12"));
        addReservationRequest.setBookedTo(getDate("2012-01-15"));
        User user = createNewUser(Role.USER);
        TestSecurityContextHolder.setAuthentication(new UsernamePasswordAuthenticationToken(user, new Object(), user.getAuthorities()));
        mockMvc.perform(MockMvcRequestBuilders.post("/reservations").with(testSecurityContext())
                .contentType(MediaType.APPLICATION_JSON).content(toJson(addReservationRequest))).andExpect(status().isOk());
        assertTrue(all.size() < roomRepository.findAll().size());
    }

    @Test
    void addReservationRoomNotPresent() throws Exception {
        AddReservationRequest addReservationRequest = new AddReservationRequest();
        addReservationRequest.setRoomId(12456L);
        addReservationRequest.setBookedFrom(getDate("2012-01-12"));
        addReservationRequest.setBookedTo(getDate("2012-01-15"));
        User user = createNewUser(Role.USER);
        TestSecurityContextHolder.setAuthentication(new UsernamePasswordAuthenticationToken(user, new Object(), user.getAuthorities()));
        Assertions
                .assertThatThrownBy(
                        () -> mockMvc.perform(MockMvcRequestBuilders.post("/reservations").with(testSecurityContext())
                                .contentType(MediaType.APPLICATION_JSON).content(toJson(addReservationRequest))))
                .hasCauseInstanceOf(RuntimeException.class).hasMessageContaining("Room not found");

    }

    private User createNewUser(Role role) {
        User entity = new User();
        entity.setAuthorities(Set.of(role));
        entity.setUsername("Uname" + userRepository.findAll().size());
        entity.setPassword("test");
        User user = userRepository.save(entity);
        return user;
    }

    @Test
    void updateReservation() throws Exception {
        Room myRoom = createRoom("My room");
        User user = createNewUser(Role.USER);
        Reservation reservation = createNewReservation(myRoom, user);
        reservation = reservationRepository.save(reservation);
        TestSecurityContextHolder.setAuthentication(new UsernamePasswordAuthenticationToken(user, new Object(), user.getAuthorities()));
        AddReservationRequest updateReservation = createUpdateReservation(myRoom);
        mockMvc.perform(MockMvcRequestBuilders.put("/reservations/" + reservation.getId()).with(testSecurityContext())
                .contentType(MediaType.APPLICATION_JSON).content(toJson(updateReservation))).andExpect(status().isOk());
        assertEquals(updateReservation.getComment(), reservationRepository.findById(reservation.getId()).get().getComment());
    }

    @Test
    void updateReservationFailsForDifferentUser() throws Exception {
        Room myRoom = createRoom("My room");
        User user = createNewUser(Role.USER);
        Reservation reservation = createNewReservation(myRoom, user);
        reservation = reservationRepository.save(reservation);
        TestSecurityContextHolder.setAuthentication(new UsernamePasswordAuthenticationToken(createNewUser(Role.USER), new Object(), user.getAuthorities()));
        AddReservationRequest updateReservation = createUpdateReservation(myRoom);
        Reservation finalReservation = reservation;
        Assertions
                .assertThatThrownBy(
                        () -> mockMvc.perform(MockMvcRequestBuilders.put("/reservations/" + finalReservation.getId()).with(testSecurityContext())
                                .contentType(MediaType.APPLICATION_JSON).content(toJson(updateReservation))))
                .hasMessageContaining(NOT_OWNING_THE_RESERVATION);
    }

    @Test
    void updateReservationSuccessForAdmin() throws Exception {
        Room myRoom = createRoom("My room");
        User user = createNewUser(Role.USER);
        Reservation reservation = createNewReservation(myRoom, user);
        reservation = reservationRepository.save(reservation);
        TestSecurityContextHolder.setAuthentication(new UsernamePasswordAuthenticationToken(createNewUser(Role.ADMIN), new Object(), user.getAuthorities()));
        AddReservationRequest updateReservation = createUpdateReservation(myRoom);
        mockMvc.perform(MockMvcRequestBuilders.put("/reservations/" + reservation.getId()).with(testSecurityContext())
                .contentType(MediaType.APPLICATION_JSON).content(toJson(updateReservation))).andExpect(status().isOk());

        assertEquals(updateReservation.getComment(), reservationRepository.findById(reservation.getId()).get().getComment());
    }

    @Test
    void getReservationAdminSuccess() throws Exception {
        Room myRoom = createRoom("My room");
        User user = createNewUser(Role.USER);
        Reservation reservation = createNewReservation(myRoom, user);
        reservation = reservationRepository.save(reservation);
        TestSecurityContextHolder.setAuthentication(new UsernamePasswordAuthenticationToken(createNewUser(Role.ADMIN), new Object(), user.getAuthorities()));
        mockMvc.perform(MockMvcRequestBuilders.get("/reservations/" + reservation.getId()).with(testSecurityContext()))
                .andExpect(status().isOk());
    }

    @Test
    void getReservationSameUserSuccess() throws Exception {
        Room myRoom = createRoom("My room");
        User user = createNewUser(Role.USER);
        Reservation reservation = createNewReservation(myRoom, user);
        reservation = reservationRepository.save(reservation);
        TestSecurityContextHolder.setAuthentication(new UsernamePasswordAuthenticationToken(user, new Object(), user.getAuthorities()));

        mockMvc.perform(MockMvcRequestBuilders.get("/reservations/" + reservation.getId()).with(testSecurityContext()))
                .andExpect(status().isOk());
    }

    @Test
    void getReservationAnotherUserFail() throws Exception {
        Room myRoom = createRoom("My room");
        User user = createNewUser(Role.USER);
        Reservation reservation = createNewReservation(myRoom, user);
        reservation = reservationRepository.save(reservation);
        TestSecurityContextHolder.setAuthentication(new UsernamePasswordAuthenticationToken(createNewUser(Role.USER), new Object(), user.getAuthorities()));
        Reservation finalReservation = reservation;
        Assertions
                .assertThatThrownBy(
                        () -> mockMvc.perform(MockMvcRequestBuilders.get("/reservations/" + finalReservation.getId()).with(testSecurityContext()))
                ).hasMessageContaining(NOT_OWNING_THE_RESERVATION);
    }

    @Test
    void deleteReservationAdminSuccess() throws Exception {
        Room myRoom = createRoom("My room");
        User user = createNewUser(Role.USER);
        Reservation reservation = createNewReservation(myRoom, user);
        reservation = reservationRepository.save(reservation);
        TestSecurityContextHolder.setAuthentication(new UsernamePasswordAuthenticationToken(createNewUser(Role.ADMIN), new Object(), user.getAuthorities()));
        mockMvc.perform(MockMvcRequestBuilders.delete("/reservations/" + reservation.getId()).with(testSecurityContext()))
                .andExpect(status().isOk());
        assertFalse(reservationRepository.findById(reservation.getId()).isPresent());
    }

    @Test
    void deleteReservationSameUserSuccess() throws Exception {
        Room myRoom = createRoom("My room");
        User user = createNewUser(Role.USER);
        Reservation reservation = createNewReservation(myRoom, user);
        reservation = reservationRepository.save(reservation);
        TestSecurityContextHolder.setAuthentication(new UsernamePasswordAuthenticationToken(user, new Object(), user.getAuthorities()));

        mockMvc.perform(MockMvcRequestBuilders.delete("/reservations/" + reservation.getId()).with(testSecurityContext()))
                .andExpect(status().isOk());
        assertFalse(reservationRepository.findById(reservation.getId()).isPresent());
    }

    @Test
    void deleteReservationAnotherUserFail() throws Exception {
        Room myRoom = createRoom("My room");
        User user = createNewUser(Role.USER);
        Reservation reservation = createNewReservation(myRoom, user);
        reservation = reservationRepository.save(reservation);
        TestSecurityContextHolder.setAuthentication(new UsernamePasswordAuthenticationToken(createNewUser(Role.USER), new Object(), user.getAuthorities()));
        Reservation finalReservation = reservation;
        Assertions
                .assertThatThrownBy(
                        () -> mockMvc.perform(MockMvcRequestBuilders.delete("/reservations/" + finalReservation.getId()).with(testSecurityContext()))
                ).hasMessageContaining(NOT_OWNING_THE_RESERVATION);
    }
}