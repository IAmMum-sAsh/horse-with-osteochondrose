package ru.mirea.horseWithOsteochondrose.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.mirea.horseWithOsteochondrose.entitys.Time;

@Repository
public interface TimeRepository extends JpaRepository<Time, Long> {
}
