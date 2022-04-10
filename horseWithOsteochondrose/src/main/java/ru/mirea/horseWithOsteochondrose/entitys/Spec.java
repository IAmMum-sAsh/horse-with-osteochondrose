package ru.mirea.horseWithOsteochondrose.entitys;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "specs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Spec extends BaseEntity{
    protected String name;
}
