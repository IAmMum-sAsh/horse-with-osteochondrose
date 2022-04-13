package ru.mirea.horseWithOsteochondrose.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.mirea.horseWithOsteochondrose.entitys.Record;

import java.sql.Date;
import java.util.List;

@Repository
public interface RecordRepository extends JpaRepository<Record, Long> {
    @Query("select b from Record b where b.date > :CURRENT_DATE and b.user_id = :user_id")
    List<Record> findUsersRecords(Date CURRENT_DATE, Long user_id);

    @Query("select b from Record b where b.date = :onDate and b.doctor_id = :doctor_id")
    List<Record> findDoctorsRecordsOnDay(Date onDate, Long doctor_id);
}
