package ru.mirea.horseWithOsteochondrose.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import ru.mirea.horseWithOsteochondrose.dto.DescriptionDto;
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
            if(record.isState()){
                User patient = userRepository.findById(record.getUser_id()).get();
                recordDtos.add(new RecordDto(record, patient.getUsername(),
                        currentUser.getUsername(), patient.getPolis(),
                        specRepository.findById(record.getSpec_id()).get().getName(),
                        timeRepository.findById(record.getTime_id()).get().getTime()));
            }
        }
        return recordDtos;
    }

    public List<RecordDto> doctorsAllRecords(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserName = authentication.getName();
        User currentUser = userRepository.findByEmail(currentUserName).orElseThrow(
                () -> {throw new RuntimeException("User not found");}
        );
        Long doctor_id = doctorRepository.findByUser_id(currentUser.getId()).getId();
        Doctor doctor = doctorRepository.findById(doctor_id).get();
        List<Record> records = doctor.getRecords();

        List<RecordDto> recordDtos = new LinkedList<>();
        for (Record record : records){
            User patient = userRepository.findById(record.getUser_id()).get();
            recordDtos.add(new RecordDto(record, patient.getUsername(),
                    currentUser.getUsername(), patient.getPolis(),
                    specRepository.findById(record.getSpec_id()).get().getName(),
                    timeRepository.findById(record.getTime_id()).get().getTime()));
        };
        return recordDtos;
    }

    public RecordDto closeRecord(long record_id, DescriptionDto descriptionDto){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserName = authentication.getName();
        User currentUser = userRepository.findByEmail(currentUserName).orElseThrow(
                () -> {throw new RuntimeException("User not found");}
        );

        Record record = recordRepository.getById(record_id);
        User patient = userRepository.findById(record.getUser_id()).get();
        Doctor doctor = doctorRepository.findByUser_id(currentUser.getId());

        if (record.isState()){
            List<Record> docRec = doctor.getRecords();
            docRec.remove(record);
            doctorRepository.save(doctor);

            List<Record> history = patient.getHistory();
            history.add(record);
            List<Record> records = patient.getRecords();
            records.remove(record);

            userRepository.save(patient);

            record.setDescription(descriptionDto.getDescription());
            record.setState(false);
            recordRepository.save(record);
        }

        RecordDto recordDto = new RecordDto(record, patient.getUsername(),
                currentUser.getUsername(), patient.getPolis(),
                specRepository.findById(record.getSpec_id()).get().getName(),
                timeRepository.findById(record.getTime_id()).get().getTime());
        return recordDto;
    }

    public List<RecordDto> getUserHist(long user_id){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserName = authentication.getName();
        User currentUser = userRepository.findByEmail(currentUserName).orElseThrow(
                () -> {throw new RuntimeException("User not found");}
        );

        User patient = userRepository.findById(user_id).get();
        List<Record> history = patient.getHistory();
        List<RecordDto> recordDtos = new LinkedList<>();
        for(Record record : history){
            recordDtos.add(new RecordDto(record, patient.getUsername(),
                    currentUser.getUsername(), patient.getPolis(),
                    specRepository.findById(record.getSpec_id()).get().getName(),
                    timeRepository.findById(record.getTime_id()).get().getTime()));
        }
        return recordDtos;
    }

    public List<RecordDto> getUserRec(long user_id){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserName = authentication.getName();
        User currentUser = userRepository.findByEmail(currentUserName).orElseThrow(
                () -> {throw new RuntimeException("User not found");}
        );

        User patient = userRepository.findById(user_id).get();
        List<Record> records = patient.getRecords();
        List<RecordDto> recordDtos = new LinkedList<>();
        for(Record record : records){
            recordDtos.add(new RecordDto(record, patient.getUsername(),
                    currentUser.getUsername(), patient.getPolis(),
                    specRepository.findById(record.getSpec_id()).get().getName(),
                    timeRepository.findById(record.getTime_id()).get().getTime()));
        }
        return recordDtos;
    }
}
