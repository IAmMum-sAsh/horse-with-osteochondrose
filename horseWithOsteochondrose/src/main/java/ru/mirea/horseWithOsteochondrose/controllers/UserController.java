package ru.mirea.horseWithOsteochondrose.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.mirea.horseWithOsteochondrose.entitys.User;
import ru.mirea.horseWithOsteochondrose.security.dto.UserDto;
import ru.mirea.horseWithOsteochondrose.services.UserService;

@Controller
@RequestMapping("/api")
public class UserController {
//    @Autowired
//    protected ;

    @PostMapping("/doctor/{id}")
    public ResponseEntity<UserDto> getGiveManage(@PathVariable long user_id, @PathVariable long spec_id){

        return ResponseEntity.ok();
    }

}
