package ru.mirea.horseWithOsteochondrose.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.AccessType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ru.mirea.horseWithOsteochondrose.dto.*;
import ru.mirea.horseWithOsteochondrose.entitys.Spec;
import ru.mirea.horseWithOsteochondrose.services.DoctorService;
import ru.mirea.horseWithOsteochondrose.services.RecordService;

import java.util.LinkedList;
import java.util.List;
import java.util.function.DoubleToIntFunction;

@Controller
@RequestMapping("/api/doctor")
public class DoctorController {
    @Autowired
    protected RecordService recordService;

    @Autowired
    protected DoctorService doctorService;

    @GetMapping("/records")
    public ResponseEntity<List<RecordDto>> doctorsRecords(){
        List<RecordDto> recordDtos = doctorService.doctorsRecords();
        return ResponseEntity.ok(recordDtos);
    }

    @GetMapping("/records/{id}")
    public ResponseEntity<RecordDto> doctorsRecord(@PathVariable long id){
        List<RecordDto> recordDtos = doctorService.doctorsRecords();
        RecordDto recordDto = new RecordDto();
        for(RecordDto dto : recordDtos){
            if(dto.getId() == id){
                recordDto = dto;
            }
        }
        return ResponseEntity.ok(recordDto);
    }
}
