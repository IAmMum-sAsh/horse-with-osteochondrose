package ru.mirea.horseWithOsteochondrose.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import ru.mirea.horseWithOsteochondrose.dto.RecordDto;
import ru.mirea.horseWithOsteochondrose.entitys.Doctor;
import ru.mirea.horseWithOsteochondrose.entitys.Record;
import ru.mirea.horseWithOsteochondrose.entitys.User;
import ru.mirea.horseWithOsteochondrose.repositories.*;
import ru.mirea.horseWithOsteochondrose.security.payload.UserDtoPayload;

import java.sql.Date;
import java.util.Calendar;
import java.util.LinkedList;
import java.util.List;

@Service
@Slf4j
public class DoctorService {
    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    protected UserRepository userRepository;

    @Autowired
    protected RecordRepository recordRepository;

    @Autowired
    protected SpecRepository specRepository;

    @Autowired
    protected TimeRepository timeRepository;

    public Doctor addNewDoctor(User user, long spec_id){
        Doctor doctor = new Doctor();

        doctor.setUser_id(user.getId());
        doctor.setSpec_id(spec_id);
        doctor.setRecords(new LinkedList<>());

        return doctorRepository.save(doctor);
    }

    public User doctorToUser(Doctor doctor){
        return userRepository.findById(doctor.getUser_id()).get();
    }

    public List<RecordDto> doctorsRecords(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserName = authentication.getName();
        User currentUser = userRepository.findByEmail(currentUserName).orElseThrow(
                () -> {throw new RuntimeException("User not found");}
        );
        Long doctor_id = doctorRepository.findByUser_id(currentUser.getId()).getId();

        Calendar calendar = Calendar.getInstance();
        java.util.Date currentDate = calendar.getTime();
        Date date = new Date(currentDate.getTime());

        List<Record> records = recordRepository.findDoctorsRecordsOnDay(date, doctor_id);
        List<RecordDto> recordDtos = new LinkedList<>();
        for (Record record : records){
            recordDtos.add(new RecordDto(record, userRepository.findById(record.getUser_id()).get().getUsername(),
                    currentUser.getUsername(), userRepository.findById(record.getUser_id()).get().getPolis(),
                    specRepository.findById(record.getSpec_id()).get().getName(),
                    timeRepository.findById(record.getTime_id()).get().getTime()));
        }
        return recordDtos;
    }
}
