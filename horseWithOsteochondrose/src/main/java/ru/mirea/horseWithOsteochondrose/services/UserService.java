package ru.mirea.horseWithOsteochondrose.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import ru.mirea.horseWithOsteochondrose.entitys.Doctor;
import ru.mirea.horseWithOsteochondrose.entitys.User;
import ru.mirea.horseWithOsteochondrose.repositories.UserRepository;
import ru.mirea.horseWithOsteochondrose.security.payload.UserDtoPayload;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DoctorService doctorService;

//    @Autowired
    public BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    public Optional<User> findById(Long userId) {
        return userRepository.findById(userId);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public List<User> findAll() {return userRepository.findAll();}

    public User registerNewUser(UserDtoPayload userDtoPayload, String role) {
        User user = new User();

        user.setEmail(userDtoPayload.getEmail());
        user.setUsername(userDtoPayload.getUsername());
        user.setPolis(userDtoPayload.getPolis());
        user.setHistory(new LinkedList<>());
        user.setRecords(new LinkedList<>());
        user.setRole(role);

        String encodedPassword = bCryptPasswordEncoder.encode(userDtoPayload.getPassword());
        user.setPassword(encodedPassword);

        userRepository.save(user);

        return user;
    }

    public Doctor giveDoctor(User user, long spec_id){
        user.setRole("ROLE_DOCTOR");
        userRepository.save(user);

        Doctor doctor = doctorService.addNewDoctor(user, spec_id);

        return doctor;
    }

    public User giveAdmin(User user){
        user.setRole("ROLE_ADMIN");

        return userRepository.save(user);
    }

}