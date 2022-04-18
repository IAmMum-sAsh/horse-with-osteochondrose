package ru.mirea.horseWithOsteochondrose.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ru.mirea.horseWithOsteochondrose.dto.RecordDto;
import ru.mirea.horseWithOsteochondrose.dto.RecordDtoPayload;
import ru.mirea.horseWithOsteochondrose.services.RecordService;

@Controller
@RequestMapping("/api/record")
public class RecordController {
    @Autowired
    protected RecordService recordService;

    @PutMapping("/{id}")
    public ResponseEntity<RecordDto> updateRecord(@PathVariable long id, @RequestBody RecordDtoPayload recordDtoPayload) {
        return ResponseEntity.ok(recordService.updateRecord(id, recordDtoPayload));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<RecordDto> deleteRecord(@PathVariable long id) {
        return ResponseEntity.ok(recordService.deleteRecord(id));
    }
}
