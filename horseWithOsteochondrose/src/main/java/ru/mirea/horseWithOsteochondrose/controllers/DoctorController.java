package ru.mirea.horseWithOsteochondrose.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.AccessType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ru.mirea.horseWithOsteochondrose.dto.RecordDto;
import ru.mirea.horseWithOsteochondrose.dto.RecordDtoPayload;
import ru.mirea.horseWithOsteochondrose.dto.TimeDto;
import ru.mirea.horseWithOsteochondrose.dto.TimeDtoPayload;
import ru.mirea.horseWithOsteochondrose.services.RecordService;

import java.util.List;

@Controller
@RequestMapping("/api/doctor")
public class DoctorController {
    @Autowired
    protected RecordService recordService;


}
