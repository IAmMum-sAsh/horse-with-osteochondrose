package ru.mirea.horseWithOsteochondrose.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.mirea.horseWithOsteochondrose.entitys.Doctor;
import ru.mirea.horseWithOsteochondrose.entitys.Record;

import java.sql.Date;
import java.util.List;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    @Query("select b from Doctor b where b.spec_id = :spec_id")
    List<Doctor> findAllBySpecID(Long spec_id);

    @Query("select b from Doctor b where b.user_id = :user_id")
    Doctor findByUser_id(Long user_id);
}
