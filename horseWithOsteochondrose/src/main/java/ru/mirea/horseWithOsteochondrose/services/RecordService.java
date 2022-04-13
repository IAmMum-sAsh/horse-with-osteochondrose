package ru.mirea.horseWithOsteochondrose.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.mirea.horseWithOsteochondrose.dto.RecordDto;
import ru.mirea.horseWithOsteochondrose.dto.TimeDto;
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
}
