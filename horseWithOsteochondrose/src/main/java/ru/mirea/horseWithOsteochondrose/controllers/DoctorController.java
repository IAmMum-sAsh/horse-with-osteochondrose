package ru.mirea.horseWithOsteochondrose.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.AccessType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.mirea.horseWithOsteochondrose.dto.TimeDto;
import ru.mirea.horseWithOsteochondrose.dto.TimeDtoPayload;
import ru.mirea.horseWithOsteochondrose.services.RecordService;

import java.util.List;

@Controller
@RequestMapping("/api/doctor")
public class DoctorController {
    @Autowired
    protected RecordService recordService;

    @PostMapping("/{id}")
    public ResponseEntity<List<TimeDto>> getEmptyRecords(@PathVariable long id, @RequestBody TimeDtoPayload timeDtoPayload) {
        List<TimeDto> timeDtos = recordService.getEmptyRecords(timeDtoPayload.getDate(), id);
        return ResponseEntity.ok(timeDtos);
    }
}
