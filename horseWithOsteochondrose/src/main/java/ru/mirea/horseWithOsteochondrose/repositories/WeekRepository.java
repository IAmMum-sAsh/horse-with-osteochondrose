package ru.mirea.horseWithOsteochondrose.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.mirea.horseWithOsteochondrose.entitys.Week;

@Repository
public interface WeekRepository extends JpaRepository<Week, Long> {
}