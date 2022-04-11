package ru.mirea.horseWithOsteochondrose.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.mirea.horseWithOsteochondrose.entitys.User;
import ru.mirea.horseWithOsteochondrose.security.dto.UserDto;
import ru.mirea.horseWithOsteochondrose.security.payload.UserDtoPayload;
import ru.mirea.horseWithOsteochondrose.services.UserService;

@Controller
@RequestMapping("/api/signup")
public class UserSignupController {

    @Autowired
    UserService userService;

    @PostMapping("/")
    public ResponseEntity<UserDto> signupNewUser(@RequestBody UserDtoPayload userDtoPayload) {
        if (userService.findByEmail(userDtoPayload.getEmail()).isPresent())
            throw new RuntimeException();

        User registeredUser = userService.registerNewUser(userDtoPayload, "ROLE_USER");

        return ResponseEntity.ok(new UserDto(registeredUser));
    }

}