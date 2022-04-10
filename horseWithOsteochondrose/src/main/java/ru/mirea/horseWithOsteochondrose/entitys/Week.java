package ru.mirea.horseWithOsteochondrose.entitys;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.List;

@Entity
@Table(name = "weeks")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Week extends BaseEntity{
    @OneToMany
    protected List<Day> days;
}
