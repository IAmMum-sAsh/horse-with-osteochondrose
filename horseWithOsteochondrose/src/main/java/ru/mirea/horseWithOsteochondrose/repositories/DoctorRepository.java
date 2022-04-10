package ru.mirea.horseWithOsteochondrose.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.mirea.horseWithOsteochondrose.entitys.Doctor;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
}
