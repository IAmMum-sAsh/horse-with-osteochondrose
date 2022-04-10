package ru.mirea.horseWithOsteochondrose.entitys;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "records")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Record extends BaseEntity{
    protected Long user_id;
    protected Long doctor_id;
    protected Long spec_id;
    protected String time;
    protected String description;

}
