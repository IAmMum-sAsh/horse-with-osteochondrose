package ru.mirea.horseWithOsteochondrose.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.mirea.horseWithOsteochondrose.entitys.Record;

@Repository
public interface RecordRepository extends JpaRepository<Record, Long> {
}
