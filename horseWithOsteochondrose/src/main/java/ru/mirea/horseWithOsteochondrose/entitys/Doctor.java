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
@Table(name = "doctors")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Doctor extends BaseEntity{
    protected Long user_id;
    protected Long spec_id;
    @OneToMany
    protected List<Record> records;
}
