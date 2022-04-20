package ru.mirea.horseWithOsteochondrose.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import ru.mirea.horseWithOsteochondrose.dto.RecordDto;
import ru.mirea.horseWithOsteochondrose.dto.RecordDtoPayload;
import ru.mirea.horseWithOsteochondrose.dto.TimeDto;
import ru.mirea.horseWithOsteochondrose.dto.TimeDtoPayload;
import ru.mirea.horseWithOsteochondrose.entitys.Doctor;
import ru.mirea.horseWithOsteochondrose.entitys.Record;
import ru.mirea.horseWithOsteochondrose.entitys.Time;
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

    @Autowired
    protected UserService userService;

    public List<RecordDto> findUsersRecords(User user) {
        Calendar calendar = Calendar.getInstance();
        java.util.Date currentDate = calendar.getTime();
        Date date = new Date(currentDate.getTime());
        List<Record> records = recordRepository.findUsersRecords(date, user.getId());
        List<RecordDto> recordDtos = new LinkedList<>();
        for (Record record : records){
            if(record.isState()){
                recordDtos.add(new RecordDto(record, user.getUsername(),
                        userRepository.findById(doctorRepository.findById(record.getDoctor_id()).get().getUser_id()).get().getUsername(),
                        user.getPolis(), specRepository.findById(record.getSpec_id()).get().getName(),
                        timeRepository.findById(record.getTime_id()).get().getTime()));
            }
        }
        return recordDtos;
    }

    public List<Record> findDoctorsRecordsOnDay(String date, Long doctor_id) {
        Date onDate = Date.valueOf(date);
        return recordRepository.findDoctorsRecordsOnDay(onDate, doctor_id);
    }

    public List<TimeDto> getEmptyRecords(String date, Long doctor_id){
        List<Time> times = timeRepository.findAll();
        List<TimeDto> timeDtos = new LinkedList<>();
        for(Time time : times){
            timeDtos.add(new TimeDto(time));
        }

        List<Record> records = this.findDoctorsRecordsOnDay(date, doctor_id);

        for(Record record : records){
            for(int i=0; i<timeDtos.size(); i++){
                if(timeDtos.get(i).getId() == record.getTime_id()){
                    timeDtos.remove(i);
                    i--;
                }
            }
        }

        return timeDtos;
    }


    public RecordDto createRecord(long id, RecordDtoPayload recordDtoPayload){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserName = authentication.getName();
        User currentUser = userService.findByEmail(currentUserName).orElseThrow(
                () -> {throw new RuntimeException("User not found");}
        );

        Doctor doctor = doctorRepository.findById(id).get();

        Record record = new Record(currentUser.getId(), id, doctor.getSpec_id(),
                recordDtoPayload.getDate(), "", recordDtoPayload.getTime_id(), true);

        recordRepository.save(record);

        List<Record> records = currentUser.getRecords();
        records.add(record);
        userRepository.save(currentUser);

        List<Record> docRec = doctor.getRecords();
        docRec.add(record);
        doctorRepository.save(doctor);

        RecordDto recordDto = new RecordDto(record, currentUser.getUsername(),
                userRepository.findById(doctorRepository.findById(record.getDoctor_id()).get().getUser_id()).get().getUsername(),
                currentUser.getPolis(), specRepository.findById(record.getSpec_id()).get().getName(),
                timeRepository.findById(record.getTime_id()).get().getTime());
        return recordDto;
    }

    public RecordDto updateRecord(long id, RecordDtoPayload recordDtoPayload){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserName = authentication.getName();
        User currentUser = userService.findByEmail(currentUserName).orElseThrow(
                () -> {throw new RuntimeException("User not found");}
        );

        Record record = recordRepository.getById(id);
        record.setDate(recordDtoPayload.getDate());
        record.setTime_id(recordDtoPayload.getTime_id());

        recordRepository.save(record);

        RecordDto recordDto = new RecordDto(record, currentUser.getUsername(),
                userRepository.findById(doctorRepository.findById(record.getDoctor_id()).get().getUser_id()).get().getUsername(),
                currentUser.getPolis(), specRepository.findById(record.getSpec_id()).get().getName(),
                timeRepository.findById(record.getTime_id()).get().getTime());
        return recordDto;
    }

    public RecordDto deleteRecord(long id){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserName = authentication.getName();
        User currentUser = userService.findByEmail(currentUserName).orElseThrow(
                () -> {throw new RuntimeException("User not found");}
        );

        Record record = recordRepository.getById(id);

        List<Record> records = currentUser.getRecords();
        records.remove(record);
        userRepository.save(currentUser);

        Doctor doctor = doctorRepository.findById(record.getDoctor_id()).get();

        List<Record> docRec = doctor.getRecords();
        docRec.remove(record);
        doctorRepository.save(doctor);

        recordRepository.delete(record);

        RecordDto recordDto = new RecordDto(record, currentUser.getUsername(),
                userRepository.findById(doctor.getUser_id()).get().getUsername(),
                currentUser.getPolis(), specRepository.findById(record.getSpec_id()).get().getName(),
                timeRepository.findById(record.getTime_id()).get().getTime());
        recordDto.setDescription("*******Удалено*******");
        return recordDto;
    }
}
