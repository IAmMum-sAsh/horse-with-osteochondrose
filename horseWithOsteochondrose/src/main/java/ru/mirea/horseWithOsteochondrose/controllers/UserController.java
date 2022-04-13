package ru.mirea.horseWithOsteochondrose.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ru.mirea.horseWithOsteochondrose.dto.DoctorDto;
import ru.mirea.horseWithOsteochondrose.dto.RecordDto;
import ru.mirea.horseWithOsteochondrose.dto.SpecDto;
import ru.mirea.horseWithOsteochondrose.entitys.Doctor;
import ru.mirea.horseWithOsteochondrose.entitys.Record;
import ru.mirea.horseWithOsteochondrose.entitys.Spec;
import ru.mirea.horseWithOsteochondrose.entitys.User;
import ru.mirea.horseWithOsteochondrose.repositories.DoctorRepository;
import ru.mirea.horseWithOsteochondrose.repositories.SpecRepository;
import ru.mirea.horseWithOsteochondrose.security.dto.UserDto;
import ru.mirea.horseWithOsteochondrose.services.DoctorService;
import ru.mirea.horseWithOsteochondrose.services.RecordService;
import ru.mirea.horseWithOsteochondrose.services.UserService;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

@Controller
@RequestMapping("/api")
public class UserController {
    @Autowired
    protected UserService userService;

    @Autowired
    protected RecordService recordService;

    @Autowired
    protected SpecRepository specRepository;

    @Autowired
    protected DoctorRepository doctorRepository;

    @Autowired
    protected DoctorService doctorService;

    @GetMapping("/records")
    public ResponseEntity<List<RecordDto>> getMyRecords(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserName = authentication.getName();
        User currentUser = userService.findByEmail(currentUserName).orElseThrow(
                () -> {throw new RuntimeException("User not found");}
        );

        List<RecordDto> recordDtos = recordService.findUsersRecords(currentUser);
        return ResponseEntity.ok(recordDtos);
    }

    @GetMapping("/specs")
    public ResponseEntity<List<SpecDto>> getSpecs(){
        List<SpecDto> specDtos = new LinkedList<>();
        List<Spec> specs = specRepository.findAll();

        for(Spec spec : specs){
            specDtos.add(new SpecDto(spec));
        }

        return ResponseEntity.ok(specDtos);
    }

    @GetMapping("/specs/{id}")
    public ResponseEntity<List<DoctorDto>> getSpecsDoctors(@PathVariable long id){
        List<DoctorDto> doctorDtos = new LinkedList<>();
        List<Doctor> doctors = doctorRepository.findAllBySpecID(id);

        for(Doctor doctor : doctors){
            doctorDtos.add(new DoctorDto(doctor.getId(), doctorService.doctorToUser(doctor).getUsername()));
        }

        return ResponseEntity.ok(doctorDtos);
    }
}
