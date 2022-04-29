package ru.mirea.horseWithOsteochondrose.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.mirea.horseWithOsteochondrose.entitys.Record;

import java.sql.Date;
import java.util.List;

@Repository
public interface RecordRepository extends JpaRepository<Record, Long> {
    //предстоящие записи пользователя
    @Query("select b from Record b where b.date >= :CURRENT_DATE and b.user_id = :user_id and b.state = true")
    List<Record> findUsersRecords(Date CURRENT_DATE, Long user_id);

    //записи доктора на число
    @Query("select b from Record b where b.date = :onDate and b.doctor_id = :doctor_id")
    List<Record> findDoctorsRecordsOnDay(Date onDate, Long doctor_id);
}
