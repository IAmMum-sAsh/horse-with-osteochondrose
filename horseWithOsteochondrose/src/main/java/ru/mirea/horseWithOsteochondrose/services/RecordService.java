package ru.mirea.horseWithOsteochondrose.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.mirea.horseWithOsteochondrose.dto.RecordDto;
import ru.mirea.horseWithOsteochondrose.entitys.Record;
import ru.mirea.horseWithOsteochondrose.entitys.User;
import ru.mirea.horseWithOsteochondrose.repositories.*;

import java.sql.Date;
import java.util.Calendar;
import java.util.LinkedList;
import java.util.List;

@Service
@Slf4j
public class RecordService {
    @Autowired
    protected RecordRepository recordRepository;

    @Autowired
    protected TimeRepository timeRepository;

    @Autowired
    protected DoctorRepository doctorRepository;

    @Autowired
    protected UserRepository userRepository;

    @Autowired
    protected SpecRepository specRepository;

//    public Doctor addNewDoctor(User user, long spec_id){
//        Doctor doctor = new Doctor();
//
//        doctor.setUser_id(user.getId());
//        doctor.setSpec_id(spec_id);
//        doctor.setRecords(new LinkedList<>());
//
//        return doctorRepository.save(doctor);
//    }

    public List<RecordDto> findUsersRecords(User user) {
        Calendar calendar = Calendar.getInstance();
        java.util.Date currentDate = calendar.getTime();
        Date date = new Date(currentDate.getTime());
        List<Record> records = recordRepository.findUsersRecords(date, user.getId());
        List<RecordDto> recordDtos = new LinkedList<>();
        for (Record record : records){
            recordDtos.add(new RecordDto(record, user.getUsername(),
                    userRepository.findById(doctorRepository.findById(record.getDoctor_id()).get().getUser_id()).get().getUsername(),
                    user.getPolis(), specRepository.findById(record.getSpec_id()).get().getName(),
                    timeRepository.findById(record.getTime_id()).get().getTime()));
        }
        return recordDtos;
    }
}
