package ru.mirea.horseWithOsteochondrose.entitys;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "times")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Time extends BaseEntity {
    protected String time;
}
