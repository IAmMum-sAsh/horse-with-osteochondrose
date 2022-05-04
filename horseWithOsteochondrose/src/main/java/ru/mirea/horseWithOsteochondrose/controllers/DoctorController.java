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

    @GetMapping("/all_records")
    public ResponseEntity<List<RecordDto>> doctorsAllRecords(){
        List<RecordDto> recordDtos = doctorService.doctorsAllRecords();
        return ResponseEntity.ok(recordDtos);
    }

    @GetMapping("/record")
    public ResponseEntity<List<RecordDto>> doctorsRecords(){
        List<RecordDto> recordDtos = doctorService.doctorsRecords();
        return ResponseEntity.ok(recordDtos);
    }

    @GetMapping("/record/{id}")
    public ResponseEntity<RecordDto> doctorsRecord(@PathVariable long id){
        List<RecordDto> recordDtos = doctorService.doctorsAllRecords();
        RecordDto recordDto = new RecordDto();
        for(RecordDto dto : recordDtos){
            if(dto.getId() == id){
                recordDto = dto;
            }
        }
        if(recordDto.getId() != null){
            return ResponseEntity.ok(recordDto);
        }
        else{return ResponseEntity.ok(new RecordDto());}

    }

    @PutMapping("/record/{id}/close")
    public ResponseEntity<RecordDto> closeRecord(@PathVariable long id, @RequestBody DescriptionDto descriptionDto){
        RecordDto recordDto = doctorService.closeRecord(id, descriptionDto);
        return ResponseEntity.ok(recordDto);
    }

    @GetMapping("/user/{id}/history")
    public ResponseEntity<List<RecordDto>> userHist(@PathVariable long id){
        List<RecordDto> recordDtos = doctorService.getUserHist(id);
        return ResponseEntity.ok(recordDtos);
    }

    @GetMapping("/user/{id}/records")
    public ResponseEntity<List<RecordDto>> userRec(@PathVariable long id){
        List<RecordDto> recordDtos = doctorService.getUserRec(id);
        return ResponseEntity.ok(recordDtos);
    }
}
