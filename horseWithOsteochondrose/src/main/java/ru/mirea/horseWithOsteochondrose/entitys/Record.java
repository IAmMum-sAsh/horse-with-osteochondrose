package ru.mirea.horseWithOsteochondrose.entitys;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.sql.Date;

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
    protected Date date;
    protected String description;
    protected Long time_id;
    protected boolean state;
}
