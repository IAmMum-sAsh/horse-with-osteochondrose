package ru.mirea.horseWithOsteochondrose.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.mirea.horseWithOsteochondrose.entitys.Record;
import ru.mirea.horseWithOsteochondrose.entitys.Spec;

import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecordDto {
    protected Long id;
    protected String user;
    protected String polis;
    protected String doctor;
    protected String spec;
    protected Date date;
    protected String time;
    protected String description;

    protected Long doctor_id;
    protected Long user_id;

    public RecordDto(Record record, String user, String doctor, String polis, String spec, String time){
        this.id = record.getId();
        this.user = user;
        this.doctor = doctor;
        this.polis = polis;
        this.spec = spec;
        this.date = record.getDate();
        this.time = time;
        this.description = record.getDescription();
        this.user_id = record.getUser_id();
    }

    public RecordDto(Record record, String user, String doctor, String polis, String spec, String time, Long doctor_id){
        this.id = record.getId();
        this.user = user;
        this.doctor = doctor;
        this.polis = polis;
        this.spec = spec;
        this.date = record.getDate();
        this.time = time;
        this.description = record.getDescription();
        this.doctor_id = doctor_id;
        this.user_id = record.getUser_id();
    }
}
