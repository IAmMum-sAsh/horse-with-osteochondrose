package ru.mirea.horseWithOsteochondrose.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.mirea.horseWithOsteochondrose.entitys.User;
import ru.mirea.horseWithOsteochondrose.security.dto.AuthenticationRequestDto;
import ru.mirea.horseWithOsteochondrose.security.dto.UserDto;
import ru.mirea.horseWithOsteochondrose.services.UserService;

@Controller
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    protected UserService userService;

    @PutMapping("/give_doctor/{user_id}/{spec_id}")
    public ResponseEntity<UserDto> getGiveManage(@PathVariable long user_id, @PathVariable long spec_id){
        User user = userService.findById(user_id).get();
        userService.giveDoctor(user, spec_id);
        return ResponseEntity.ok(new UserDto(user));
    }

    @PutMapping("/give_admin/{id}")
    public ResponseEntity<UserDto> getGiveAdmin(@PathVariable long id){
        User user = userService.findById(id).get();
        userService.giveAdmin(user);
        return ResponseEntity.ok(new UserDto(user));
    }
}
