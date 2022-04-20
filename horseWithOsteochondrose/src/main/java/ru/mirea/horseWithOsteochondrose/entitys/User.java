package ru.mirea.horseWithOsteochondrose.entitys;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.List;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class User extends BaseEntity{
    protected String username;
    protected String email;
    protected String password;
    protected String role;
    protected String polis;
    @ManyToMany
    protected List<Record> records;
    @ManyToMany
    protected List<Record> history;
}