package ru.mirea.horseWithOsteochondrose.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.mirea.horseWithOsteochondrose.entitys.Doctor;
import ru.mirea.horseWithOsteochondrose.entitys.User;
import ru.mirea.horseWithOsteochondrose.repositories.DoctorRepository;
import ru.mirea.horseWithOsteochondrose.security.payload.UserDtoPayload;

import java.util.LinkedList;

@Service
@Slf4j
public class DoctorService {
    @Autowired
    private DoctorRepository doctorRepository;

    public Doctor addNewDoctor(User user, long spec_id){
        Doctor doctor = new Doctor();

        doctor.setUser_id(user.getId());
        doctor.setSpec_id(spec_id);
        doctor.setRecords(new LinkedList<>());

        return doctorRepository.save(doctor);
    }
}
