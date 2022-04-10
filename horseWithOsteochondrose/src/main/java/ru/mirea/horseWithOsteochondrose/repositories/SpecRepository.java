package ru.mirea.horseWithOsteochondrose.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.mirea.horseWithOsteochondrose.entitys.Spec;

@Repository
public interface SpecRepository extends JpaRepository<Spec, Long> {
}
